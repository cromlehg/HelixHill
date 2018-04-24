pragma solidity ^0.4.18;

import './CommonSale.sol';
import './TimeCountBonusFeature.sol';

contract AssembledCommonSale is TimeCountBonusFeature {

  function calculateTokens(uint _invested) internal returns(uint) {
    uint milestoneIndex = currentMilestone();
    Milestone storage milestone = milestones[milestoneIndex];
    uint tokens = milestone.price.mul(_invested).div(1 ether);
    return tokens;
  }

}
