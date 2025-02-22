// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface TokenInterface {
    function createToken(string memory _name, string memory _symbol, uint8 _decimals) external;
    function swap(address tokenAddress, uint256 amount, bool isBuy) external;
    function estimateSwap(address tokenAddress, uint256 amount, bool isBuy) external view returns (uint256);
    function setThreshold(uint256 _threshold) external;
    function setPrice(address tokenAddress, uint256 price) external;
    function getBalance(address user) external view returns (uint256);
    function migrate(address newContract) external;
    function withdraw() external;

    event TokenCreated(string name, string symbol, uint8 decimals);
    event TokenSwapped(address token, uint256 amount, bool isBuy);
    event ThresholdSet(uint256 threshold);
    event PriceUpdated(address token, uint256 price);
    event Migrate(address newContract);
}