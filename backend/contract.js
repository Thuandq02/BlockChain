// contract.js
import Web3 from 'web3';
import Dotenv from 'dotenv';

Dotenv.config();

const web3 = new Web3(process.env.INFURA_URL);

// Địa chỉ hợp đồng và ABI
const contractAddress = process.env.CONTRACT_ADDRESS;
const contractABI =  [
    {
      "constant": true,
      "inputs": [{"name": "user", "type": "address"}],
      "name": "getBalance",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{"name": "tokenAddress", "type": "address"}, {"name": "amount", "type": "uint256"}, {"name": "isBuy", "type": "bool"}],
      "name": "swap",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{"name": "tokenAddress", "type": "address"}, {"name": "price", "type": "uint256"}],
      "name": "setPrice",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [{"name": "_name", "type": "string"}, {"name": "_symbol", "type": "string"}, {"name": "_decimals", "type": "uint8"}],
      "name": "createToken",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const contract = new web3.eth.Contract(contractABI, contractAddress);

export default contract;