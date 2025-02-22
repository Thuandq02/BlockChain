// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './TokenInterface.sol';

contract Token is TokenInterface {
    string public name;
    string public symbol;
    uint8 public decimals;
    address public owner;
    
    mapping(address => uint256) public balances;
    mapping(address => uint256) public priceFeed; // mapping to store price data
    uint256 public swapThreshold;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor(string memory _name, string memory _symbol, uint8 _decimals) {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        owner = msg.sender;

        emit TokenCreated(_name, _symbol, _decimals);
    }

    // Create token - set name, symbol, decimals
    function createToken(string memory _name, string memory _symbol, uint8 _decimals) external onlyOwner {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;

        emit TokenCreated(_name, _symbol, _decimals);
    }

    // Swap function: Buy or Sell tokens
    function swap(address tokenAddress, uint256 amount, bool isBuy) external {
        require(amount > 0, "Amount must be greater than 0");
        uint256 price = priceFeed[tokenAddress];
        require(price > 0, "Token price not available");

        uint256 totalAmount = amount * price;
        
        if (isBuy) {
            require(balances[msg.sender] >= totalAmount, "Insufficient balance to buy");
            balances[msg.sender] -= totalAmount;
        } else {
            balances[msg.sender] += totalAmount;
        }

        emit TokenSwapped(tokenAddress, amount, isBuy);
    }

    // Estimate the amount of tokens that can be swapped based on the current price
    function estimateSwap(address tokenAddress, uint256 amount, bool isBuy) external view returns (uint256) {
        uint256 price = priceFeed[tokenAddress];
        require(price > 0, "Price for token is not set");
        
        uint256 totalAmount = amount * price;

        if (isBuy) {
            return totalAmount; // Amount in native currency needed to buy tokens
        } else {
            return totalAmount / price; // Amount of tokens the user will get after selling
        }
    }

    // Set the swap threshold (minimum amount for swap)
    function setThreshold(uint256 _threshold) external onlyOwner {
        swapThreshold = _threshold;
        emit ThresholdSet(_threshold);
    }

    // Set the price for a token (can be used to update the price)
    function setPrice(address tokenAddress, uint256 price) external onlyOwner {
        priceFeed[tokenAddress] = price;
        emit PriceUpdated(tokenAddress, price);
    }

    // Get the current balance of the contract or user
    function getBalance(address user) external view returns (uint256) {
        return balances[user];
    }

    // Migrate to a new contract
    function migrate(address newContract) external onlyOwner {
        emit Migrate(newContract);
        // Optional: Add migration logic here, like transferring remaining tokens
    }

    // Fallback function to receive Ether
    receive() external payable {}

    // Destructor to withdraw contract balance to the owner
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
