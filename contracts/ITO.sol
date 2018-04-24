pragma solidity ^0.4.18;

import './AssembledCommonSale.sol';
import './ExtendedWalletsMintTokensFeature.sol';

contract ITO is ExtendedWalletsMintTokensFeature, AssembledCommonSale {

  function finish() public onlyOwner {
     mintExtendedTokens();
     token.finishMinting();
  }

}
