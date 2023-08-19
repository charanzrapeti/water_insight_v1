import Web3 from "web3";
import myContract from '../blockchain.js';
import { errorNotify, successNotify } from '../helper/toastifyHelp';
import sendApiReq from '../utils/sendApiReq';
import endPoints from '../utils/endPoints';

export async function getEcoliData() {
  return sendApiReq({
    url: endPoints.getEcoliData,
    method: "post",
  })
}

export async function refreshEcoliData() {
  return sendApiReq({
    url: endPoints.refreshEcoli,
    method: "post",
  })
}

export async function getSatelite() {
  return sendApiReq({
    url: endPoints.getSatelite,
    method: "post",
  })
}

export async function refreshSatelite() {
  return sendApiReq({
    url: endPoints.refreshSatelite,
    method: "post",
  })
}

export async function getDeviceData() {
  return sendApiReq({
    url: endPoints.getDeviceData,
    method: "post",
  })
}

export async function refreshDeviceData(email) {
  return sendApiReq({
    url: endPoints.refreshDeviceData + email,
    method: "post",
  })
}

export async function getAllOrders() {
  return sendApiReq({
    url: endPoints.getAllOrders,
    method: "post",
  })
}

export async function createOrder(data, onSuccess, onError) {
  try {
    const res = await sendApiReq({
      method: "post",
      url: endPoints.createOrder,
      data
    })

    console.log(res)

    const ownerAddress = "0x4A157b19a4d6037249876196464E3B7c77928f92";
    const amt = Web3.utils.toWei(`${data.amount}`, 'ether')

    try {
      await myContract.myContract.methods
        .transfer(ownerAddress, amt)
        .send({ from: window.ethereum.selectedAddress });

      await sendApiReq({
        method: "post",
        url: endPoints.updateOrderStatus + `/${res.orderId}`,
        data: {
          orderStatus: "paid"
        }
      })

    } catch (error) {
      await sendApiReq({
        method: "post",
        url: endPoints.updateOrderStatus + `/${res.orderId}`,
        data: {
          orderStatus: "unpaid"
        }
      })
    }

    await sendApiReq({
      method: "post",
      url: endPoints.sendEmail + `/${res.orderId}`,
    })

    successNotify("Order placed successfully")
    onSuccess()
  } catch (error) {
    console.log(error)
    onError()
    errorNotify()
  }
}

export async function getPurchaseAmount(data, onSuccess) {
  try {
    const res = await sendApiReq({
      url: endPoints.getPayment,
      method: "post",
      data
    })

    console.log(res)
    onSuccess(res?.[0]?.count || 0)
  } catch (error) {
    console.log(error)
  }
}

export async function getAllContributions() {
  return sendApiReq({
    url: endPoints.contributions,
    method: "post",
  })
}

export async function getAllPaymentss() {
  return sendApiReq({
    url: endPoints.getAllPayments,
    method: "post",
  })
}
