pragma solidity ^0.4.18;

import './CommonSale.sol';

contract TimeCountBonusFeature is CommonSale {

  struct Milestone {
    uint hardcap;
    uint price;
    uint period;
    uint invested;
    uint closed;
  }

  uint public period;

  Milestone[] public milestones;

  function milestonesCount() public constant returns(uint) {
    return milestones.length;
  }

  function addMilestone(uint _hardcap, uint _price, uint _period) public onlyOwner {
    require(_hardcap > 0 && _price > 0 && _period > 0);
    Milestone memory milestone = Milestone(_hardcap.mul(1 ether), _price, _period, 0, 0);
    milestones.push(milestone);
    hardcap = hardcap.add(milestone.hardcap);
    period = period.add(milestone.period);
  }

  function removeMilestone(uint8 number) public onlyOwner {
    require(number >=0 && number < milestones.length);
    Milestone storage milestone = milestones[number];
    hardcap = hardcap.sub(milestone.hardcap);    
    period = period.sub(milestone.period);    
    delete milestones[number];
    for (uint i = number; i < milestones.length - 1; i++) {
      milestones[i] = milestones[i+1];
    }
    milestones.length--;
  }

  function changeMilestone(uint8 number, uint _hardcap, uint _price, uint _period) public onlyOwner {
    require(number >= 0 &&number < milestones.length);
    Milestone storage milestone = milestones[number];
    hardcap = hardcap.sub(milestone.hardcap);    
    period = period.sub(milestone.period);    
    milestone.hardcap = _hardcap.mul(1 ether);
    milestone.price = _price;
    milestone.period = _period;
    hardcap = hardcap.add(milestone.hardcap);    
    period = period.add(milestone.period);    
  }

  function insertMilestone(uint8 numberAfter, uint _hardcap, uint _price, uint _period) public onlyOwner {
    require(numberAfter < milestones.length);
    Milestone memory milestone = Milestone(_hardcap.mul(1 ether), _price, _period, 0, 0);
    hardcap = hardcap.add(milestone.hardcap);
    period = period.add(milestone.period);
    milestones.length++;
    for (uint i = milestones.length - 2; i > numberAfter; i--) {
      milestones[i + 1] = milestones[i];
    }
    milestones[numberAfter + 1] = milestone;
  }

  function clearMilestones() public onlyOwner {
    for (uint i = 0; i < milestones.length; i++) {
      delete milestones[i];
    }
    milestones.length = 0;
    hardcap = 0;
    period = 0;
  }

  function endSaleDate() public returns(uint) {
    return start + period * 1 days;
  }

  function currentMilestone() public constant returns(uint) {
    uint closeTime = start;
    for(uint i=0; i < milestones.length; i++) {
      closeTime += milestones[i].period.mul(1 days);
      if(milestones[i].closed == 0 && now < closeTime) {
        return i;
      }
    }
    revert();
  }

}
