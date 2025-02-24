// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './TokenInterface.sol';
import './Minter.sol';

contract Token is TokenInterface {
    string public name = 'Admin Token';
    string public symbol = 'AK';
    uint public decimals = 18;
    address public owner;
    uint256 public creationFee = 0.01 ether;
    
    mapping(address => uint256) public balances;
    struct TokenInfo {
        Token token;      
        address creator;   
    }

    TokenInfo[] public tokens;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Cho phép owner thay đổi phí tạo coin nếu cần
    function setCreationFee(uint256 fee) external {
        require(msg.sender == owner, "Not authorized");
        creationFee = fee;
    }

    // Create token - set name, symbol, decimals
    function createToken(string memory _name, string memory _symbol) external payable returns (address) {
        require(msg.value >= creationFee, "Insufficient fee");
        Minter minter = new Minter(name, symbol);
        minter.setMinter(address(this));
        TokenInfo memory info = TokenInfo({
            token: minter,
            creator: msg.sender
        });
        tokens.push(info);

        emit TokenCreated(msg.sender, address(minter), name, symbol);

        return address(minter);
    }

    // Swap function: Buy or Sell tokens
    function swap(address tokenAddress, uint256 amount, bool isBuy) external payable {
        if (isBuy) {
            require(msg.value > 0, "Vui long gui ETH de mua token");
            uint256 tokenAmount = msg.value * rate;
            require(token.balanceOf(address(this)) >= tokenAmount, "Contract khong co du token");
            // Chuyển token từ contract sang địa chỉ người mua
            token.transfer(msg.sender, tokenAmount);
            require(balances[msg.sender] >= totalAmount, "Insufficient balance to buy");
            balances[msg.sender] -= totalAmount;
            emit TokenSwapped(tokenAddress, amount);

        } else {
            balances[msg.sender] += totalAmount;
            emit TokenSwapped(tokenAddress, amount);
        }

        emit TokenSwapped(tokenAddress, amount);
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

    function getListToken() view external returns(TokenInfo[] memory) {
        return tokens;
    }

    // Fallback function to receive Ether
    receive() external payable {}

}
