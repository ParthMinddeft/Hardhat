// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract Token {
    string public name = "Hardhat token";
    string public symbol = "HHT";
    uint public totalSupply = 10000;
 
    address public owner;

    mapping(address=>uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to,uint amount) external {
        console.log("**sender balance is %s tokens**",balances[msg.sender]);
        console.log("**sender is sending %s tokens to %s address**",amount,to);
        require(balances[msg.sender] >= amount, "Not enough tokens");
        balances[msg.sender]-=amount; //balances[msg.sender]=balances[msg.sender]-amount;
        balances[to]+=amount;
    }

    function balanceOf(address account) external view returns(uint) {
        return balances[account];
    }
}