import { errorNotify, successNotify } from '../helper/toastifyHelp';
import { enableMetaMask } from './dao.js';
import sendApiReq from '../utils/sendApiReq';
import endPoints from '../utils/endPoints';
import myContract from '../blockchain.js';

export async function payContributor(data, onSuccess, onError) {
  try {
    await sendApiReq({
      method: "post",
      url: endPoints.payContributor,
      data
    })

    successNotify("Made payment successfully")
    onSuccess()
  } catch (error) {
    console.log(error)
    onError()
    errorNotify()
  }
}

export async function computeHash(data, onSuccess, onError) {
  try {
    const res = await sendApiReq({
      method: "post",
      url: endPoints.computeHash,
      data
    })

    if (res.message) {
      successNotify("No Pending Records Found to hash in this period of time")
    } else {
      await enableMetaMask()

      await myContract.myContract.methods
        .add_datahash(data.dataType, res.hash, res.verifyId)
        .send({ from: window.ethereum.selectedAddress })

      successNotify("Computed hash successfully")
    }

    onSuccess()

  } catch (error) {
    console.log(error)
    onError()
    errorNotify()
  }
}

export async function verify(data, onSuccess, onError) {
  try {
    const { hash } = await sendApiReq({
      method: "post",
      url: endPoints.verify + `/${data.verifyId}`,
      data
    })

    await enableMetaMask()

    const isVerified = await myContract.myContract.methods
      .verifyHash(data.verifyId, hash, data.dataType)
      .call()

    successNotify(isVerified ? "Hash is verified!" : "Hash is not verified!")
    onSuccess()
  } catch (error) {
    console.log(error)
    onError()
    errorNotify()
  }
}

export async function deviceConfig(data, onSuccess, onError) {
  try {
    await sendApiReq({
      method: "post",
      url: endPoints.deviveConfig,
      data
    })

    successNotify("Device config added successfully")
    onSuccess()
  } catch (error) {
    console.log(error)
    onError()
    errorNotify()
  }
}
