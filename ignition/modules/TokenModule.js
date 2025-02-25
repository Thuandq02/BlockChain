const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const Module = buildModule("TokenContractModule", (m) => {
  const myContract = m.contract("TokenContract");

  return { myContract };
});

module.exports = Module;