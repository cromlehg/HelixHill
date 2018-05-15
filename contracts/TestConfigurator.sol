pragma solidity ^0.4.18;

import './ownership/Ownable.sol';

contract Token {
  function setSaleAgent(address newSaleAgent) public;
  function transferOwnership(address newOwner) public;
}

contract ITO {
  function setStart(uint newStart) public;
  function addMilestone(uint _hardcap, uint _price, uint _period) public;
  function setMinInvestedLimit(uint newMinInvestedLimit) public;
  function setSoftcap(uint newSoftcap) public;
  function setWallet(address newWallet) public;
  function addWallet(address wallet, uint percent) public;
  function setPercentRate(uint newPercentRate) public;
  function setToken(address newToken) public;
  function setTeamWallet (address _teamWallet) public;
  function transferOwnership(address newOwner) public;
}

contract TeamWallet {
  function setToken (address _token) public;
  function setCrowdsale (address _crowdsale) public;
  function setLockPeriod (uint _lockDays) public;
  function transferOwnership(address newOwner) public;
}

contract TestConfigurator is Ownable {
  Token public token;
  ITO public ito;
  TeamWallet public teamWallet;

  function setToken(address _token) public onlyOwner {
    token = Token(_token);
  }

  function setITO(address _ito) public onlyOwner {
    ito = ITO(_ito);
  }
  
  function setTeamWallet(address _teamWallet) public onlyOwner {
    teamWallet = TeamWallet(_teamWallet);
  }

  function deploy() public onlyOwner {

    token.setSaleAgent(ito);

    ito.setStart(1525651200);
    ito.addMilestone(2000, 5000000000000000000000, 15);
    ito.addMilestone(1, 2000000000000000000000, 30);
    ito.addMilestone(1000, 1950000000000000000000, 30);
    ito.addMilestone(2000, 1800000000000000000000, 30);
    ito.addMilestone(3000, 1750000000000000000000, 30);
    ito.addMilestone(3400, 1600000000000000000000, 30);
    ito.addMilestone(4000, 1550000000000000000000, 30);
    ito.addMilestone(4500, 1500000000000000000000, 30);
    ito.addMilestone(5000, 1450000000000000000000, 30);
    ito.addMilestone(6000, 1400000000000000000000, 30);
    ito.addMilestone(8000, 1000000000000000000000, 30);
    ito.setSoftcap(1000000000000000000);
    ito.setMinInvestedLimit(100000000000000000);
    ito.setWallet(0x8fd94be56237ea9d854b23b78615775121dd1e82);
    ito.addWallet(0x24a7774d0eba02846580A214eeca955214cA776C, 6);
    ito.addWallet(0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29, 2);
    ito.addWallet(teamWallet, 15);
    ito.addWallet(0xaa8ed6878a202eF6aFC518a64D2ccB8D73f1f2Ca, 12);
    ito.setPercentRate(100);
    ito.setToken(token);
    ito.setTeamWallet(teamWallet);
    
    teamWallet.setToken(token);
    teamWallet.setCrowdsale(ito);
    teamWallet.setLockPeriod(180);

    token.transferOwnership(owner);
    ito.transferOwnership(owner);
    teamWallet.transferOwnership(owner);
  }

}

