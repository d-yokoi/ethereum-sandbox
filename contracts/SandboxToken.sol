pragma solidity ^0.6.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract SandboxToken is ERC20 {
  constructor(uint256 initialSupply) ERC20("SandboxToken", "SBT") public {
    _mint(msg.sender, initialSupply);
  }
}
