pragma solidity ^0.4.18;

import './AssembledCommonSale.sol';
import './NextSaleAgentFeature.sol';
import './SoftcapFeature.sol';
import './StagedCrowdsale.sol';

contract PreITO is NextSaleAgentFeature, SoftcapFeature, AssembledCommonSale {

  function mintTokensByETH(address to, uint _invested) internal returns(uint) {
    uint _tokens = super.mintTokensByETH(to, _invested);
    updateBalance(to, _invested);
    return _tokens;
  }

  function finish() public onlyOwner {
    if (updateRefundState()) {
      token.finishMinting();
    } else {
      withdraw();
      token.setSaleAgent(nextSaleAgent);
    }
  }

}
