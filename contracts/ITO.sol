pragma solidity ^0.4.18;

import './AssembledCommonSale.sol';
import './SoftcapFeature.sol';
import './ExtendedWalletsMintTokensFeature.sol';
import './TeamWallet.sol';

contract ITO is ExtendedWalletsMintTokensFeature, SoftcapFeature, AssembledCommonSale {

  address public teamWallet;

  function setTeamWallet (address _teamWallet) public onlyOwner{
    teamWallet = _teamWallet;
  }

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
      mintExtendedTokens();
      token.finishMinting();
      TeamWallet tWallet = TeamWallet(teamWallet);
      tWallet.start();
    }
  }

  function fallback() internal minInvestLimited(msg.value) returns(uint) {
    require(now >= start && now < endSaleDate());
    return mintTokensByETH(msg.sender, msg.value);
  }

}
