import myContract from '../blockchain.js';
import { errorNotify, successNotify } from '../helper/toastifyHelp';
import sendApiReq from '../utils/sendApiReq';
import endPoints from '../utils/endPoints';
import { setState } from '../store/auth.js';

export async function getProjects() {
  return sendApiReq({
    method: "post",
    url: endPoints.getDaoProjects
  })
}

export async function getMyProjects() {
  return sendApiReq({
    method: "post",
    url: endPoints.getMyDaoProjects
  })
}

export const enableMetaMask = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  setState(p => ({
    userDetails: {
      ...p.userDetails,
      walletId: window.ethereum.selectedAddress
    }
  }))
}

export async function createProject(data, onSuccess, onError) {
  try {
    const {
      title, summary, description,
      fundingTarget,
      minimumStakingAmount: minimumStakeAmount,
      votingThreshold,
      closingTime: closeTime,
    } = data

    const { hash } = await sendApiReq({
      method: "post",
      url: endPoints.getHash,
      data: {
        title,
        summary,
        description,
      }
    })

    await enableMetaMask()

    await myContract.myContract.methods.Project_Add(
      fundingTarget,
      minimumStakeAmount,
      new Date(closeTime).getTime(),
      hash
    ).send({ from: window.ethereum.selectedAddress })

    const id = await myContract.myContract.methods.getProjectCount().call()

    await sendApiReq({
      method: "post",
      url: endPoints.createProject,
      data: {
        id,
        title,
        summary,
        description,
        fundingTarget,
        minimumStakeAmount,
        votingThreshold,
        closeTime,
        dataHash: hash,
        forVotes: 0,
        againstVotes: 0,
        abstainVotes: 0,
        forAmount: 0,
        againstAmount: 0,
        abstainAmount: 0,
        status: "voting",
      }
    })

    successNotify("New project created successfully")
    onSuccess()

  } catch (error) {
    console.log(error)
    onError()
    errorNotify()
  }
}

export async function createStake(data, onSuccess, onError) {
  try {
    await enableMetaMask()
    await myContract.myContract.methods.Project_StakeMoney(
      Number(data.stakeAmount), data.projectId
    ).send({ from: window.ethereum.selectedAddress })

    await sendApiReq({
      method: "post",
      url: endPoints.createStake,
      data
    })

    successNotify("Amount staked successfully")
    onSuccess()
  } catch (error) {
    console.log(error)
  }
}

export async function vote(data, onSuccess) {
  try {
    await enableMetaMask()

    await myContract.myContract.methods.Project_CastVote(
      data.type, data.id
    ).send({ from: window.ethereum.selectedAddress })

    let payload = {}

    if (data.type === "0") {
      payload.againstVotes = data.againstVotes + 1
    }
    if (data.type === "1") {
      payload.forVotes = data.forVotes + 1
    }
    if (data.type === "2") {
      payload.abstainVotes = data.abstainVotes + 1
    }

    await sendApiReq({
      method: "post",
      url: endPoints.updateProject + data.id,
      data: payload
    })

    successNotify("Voted successfully")
    onSuccess()
  } catch (error) {
    console.log(error)
  }
}

export async function closeProject(projId, onSuccess, onError) {
  try {
    await enableMetaMask()

    const project = await myContract.myContract.methods.closeVoting(
      projId
    ).send({ from: window.ethereum.selectedAddress })

    console.log(project)
    // let statusEnums = ["voting", "defeated", "succeeded"]
    // await sendApiReq({
    //   method: "post",
    //   url: endPoints.updateProject + projId,
    //   data: {
    //     status
    //   }
    // })

    onSuccess()

  } catch (error) {
    console.log(error)
    onError()
  }
}

export async function unstakeAmt({ id, amt }) {
  try {
    await enableMetaMask()

    const unstakeProject = await myContract.methods.Project_UnStakeMoney(
      amt, id
    ).send({ from: window.ethereum.selectedAddress })

    console.log(unstakeProject)

  } catch (error) {
    console.log(error)
  }
}
