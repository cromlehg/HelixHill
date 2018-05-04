pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './token/ERC20.sol';

contract TeamWallet is Ownable{
	
  address public token;

  address public crowdsale;

  uint public lockPeriod;

  uint public endLock;

  bool public started;

  modifier onlyCrowdsale() {
    require(crowdsale == msg.sender);
    _;
  }

  function setToken (address _token) public onlyOwner{
  	token = _token;
  }

  function setCrowdsale (address _crowdsale) public onlyOwner{
    crowdsale = _crowdsale;
  }

  function setLockPeriod (uint _lockDays) public onlyOwner{
  	require(!started);
  	lockPeriod = 1 days * _lockDays;
  }

  function start () public onlyCrowdsale{
  	started = true;
  	endLock = now + lockPeriod;
  }

  function withdrawTokens (address _to) public onlyOwner{
  	require(now > endLock);
  	ERC20 ERC20token = ERC20(token);
    ERC20token.transfer(_to, ERC20token.balanceOf(this));  
  }
  
}