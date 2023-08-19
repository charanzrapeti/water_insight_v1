// const path = require("path");

// require("dotenv").config({path: path.resolve(__dirname,'../config/.env')});

export const root = {
  baseUrl: "http://node-backend:4000/api",
}

const endPoints = {
  login: "/user/login",
  signup: "/user/signup",
  logout: "/user/logout",
  profile: "/user/get/profile",
  updateProfile: "/user/update/profile",
  getAllPayments: "/user/getpayments",

  refreshEcoli: "/ecolidata/refresh",
  getEcoliData: "/ecolidata/results",
  refreshDeviceData: "/devicedata/refresh/", // {email}
  getDeviceData: "/devicedata/getresults",
  getAllOrders: "/orders/orders",
  createOrder: "/orders/create",
  updateOrderStatus: "/orders/updatestatus",
  contributions: "/contributions",
  getPayment: "/filterContributions",
  sendEmail: "/orders/sendEmail",


  getSatelite: "/get/satellite",
  refreshSatelite: "/refresh/satellite",

  payContributor: "/admin/payContributor",
  deviveConfig: "/admin/devices",
  computeHash: "/admin/computeHash",
  verify: "/admin/verify",

  getHash: "/dao/getHash",
  getDaoProjects: "/dao/projects",
  getMyDaoProjects: "/dao/myprojects",
  createProject: "/dao/createProject",
  updateProject: "/dao/updateproject/",
  createStake: "/dao/createStake",
}

export default endPoints