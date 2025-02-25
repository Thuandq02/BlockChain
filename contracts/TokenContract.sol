// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './TokenERC20.sol';

contract TokenContract {
    // Sự kiện tạo token
    event TokenCreated(address indexed creator, address tokenAddress, string name, string symbol);
    // Sự kiện mua token
    event TokenPurchased(address indexed buyer, uint256 ethSpent, uint256 tokensReceived);
    // Sự kiện bán token
    event TokenSold(address indexed seller, uint256 tokensSold, uint256 ethReceived);

    address public owner;
    string public tokenName;
    string public tokenSymbol;
    uint256 public tokenPrice = 10; // Giá của mỗi token tính bằng wei
    uint256 public totalTokens; // Tổng số token có sẵn

    struct TokenInfo {
        TokenERC20 tokenInter;
        address creator;
        uint256 totalTokens;
    }
    TokenInfo[] public tokenInfos;

    // Số token của mỗi địa chỉ
    mapping(address => uint256) public balances;

    constructor() {
        owner = msg.sender;
    }

    // Hàm khởi tạo: thiết lập thông số token và emit sự kiện TokenCreated
    function created(string memory _name, string memory _symbol) external returns (address) {
        owner = msg.sender;
        tokenName = _name;
        tokenSymbol = _symbol;
        TokenERC20 tokenInterface = new TokenERC20(tokenName, tokenSymbol);

        tokenInterface.setMinter(address(this));

        TokenInfo memory info = TokenInfo({
            tokenInter: tokenInterface,
            creator: msg.sender,
            totalTokens: 50
        });

        tokenInfos.push(info);
        
        // Emit sự kiện tạo token
        emit TokenCreated(owner, address(this), tokenName, tokenSymbol);

        return address(tokenInterface);
    }

    // Hàm mua token: người dùng gửi ETH để mua token theo giá đã định
    function buyTokens() public payable {
        require(msg.value > 0, "Khong gui du ETH");
        uint256 tokensToBuy = msg.value / tokenPrice;
        require(tokensToBuy > 0, "So tien gui khong du de mua token");
        require(totalTokens >= tokensToBuy, "Khong con token du de ban");
        
        balances[msg.sender] += tokensToBuy;
        totalTokens -= tokensToBuy;
        
        // Emit sự kiện mua token
        emit TokenPurchased(msg.sender, msg.value, tokensToBuy);
    }

    // Hàm bán token: người dùng bán token và nhận lại ETH theo giá đã định
    function sellTokens(uint256 tokensToSell) public {
        require(balances[msg.sender] >= tokensToSell, "So token cua ban khong du");
        uint256 ethToReturn = tokensToSell * tokenPrice;
        require(address(this).balance >= ethToReturn, "Hop dong khong co du ETH");
        
        balances[msg.sender] -= tokensToSell;
        totalTokens += tokensToSell;
        
        payable(msg.sender).transfer(ethToReturn);
        
        // Emit sự kiện bán token
        emit TokenSold(msg.sender, tokensToSell, ethToReturn);
    }

    //get List tokens
    function getListToken() view external returns(TokenInfo[] memory) {
        return tokenInfos;
    }

    // Hàm cho phép chủ sở hữu rút ETH từ hợp đồng
    function withdraw(uint256 amount) public {
        require(msg.sender == owner, "Chi co chu so huu moi co the rut");
        require(address(this).balance >= amount, "Khong du so du trong hop dong");
        payable(owner).transfer(amount);
    }
}
