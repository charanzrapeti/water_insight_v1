import Web3 from "web3";
import WaterInsightDAO from "./assets/WaterInsightDAO.json";

const ethereum = window.ethereum;
const web3 = new Web3(ethereum);

const ContractAddress = "0x5ABaDea18D6b4d9d26896de6E1A0f636A04D1AA9";
const ContractAbi = WaterInsightDAO

const myContract = new web3.eth.Contract(
  ContractAbi,
  ContractAddress
);

export default { myContract }
