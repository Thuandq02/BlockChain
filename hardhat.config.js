require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545", // Địa chỉ của Ganache
      accounts: [
        'private_key'
      ]
    }
  }
};