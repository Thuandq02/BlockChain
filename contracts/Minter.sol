// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MemeCoin is ERC20 {
    address public minter;
    
    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
        minter = msg.sender;
    }
    
    // Chỉ cho phép minter mint token
    function mint(address to, uint256 amount) external {
        require(msg.sender == minter, "Not authorized");
        _mint(to, amount);
    }
    
    // Chỉ cho phép minter burn token
    function burn(address from, uint256 amount) external {
        require(msg.sender == minter, "Not authorized");
        _burn(from, amount);
    }
    
    // Cho phép chuyển giao quyền minter
    function setMinter(address newMinter) external {
        require(msg.sender == minter, "Not authorized");
        minter = newMinter;
    }
}
