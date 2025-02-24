require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "HTTP://127.0.0.1:7545", // Địa chỉ của Ganache
      accounts: [
        '0x6dc998083da837cb8b79ecc9e1f27b64a6be7fd81d235a46b3c690113c7a9bcf'
      ]
    }
  }
};