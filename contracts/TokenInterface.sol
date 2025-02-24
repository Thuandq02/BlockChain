// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface TokenInterface {
    function createToken(string memory _name, string memory _symbol, uint8 _decimals) external payable returns (address);
    function swap(address tokenAddress, uint256 amount, bool isBuy) external;
    // function getBalance(address user) external view returns (uint256);
    function setPrice(address tokenAddress, uint256 price) external;

    event TokenCreated(address indexed creator, address tokenAddress, string name, string symbol);
    event TokenSwapped(address indexed from, address indexed to, unit256 amout);
    // event PriceUpdated(address token, uint256 price);
}