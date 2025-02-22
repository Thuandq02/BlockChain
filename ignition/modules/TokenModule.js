const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const Module = buildModule("TokenModule", (m) => {
  const myContract = m.contract("Token");

  return { myContract };
});

module.exports = Module;