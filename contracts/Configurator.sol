pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './AssembledCommonSale.sol';
import './Token.sol';
import './PreITO.sol';
import './ITO.sol';

contract Configurator is Ownable {

  Token public token;

  PreITO public preITO;

  ITO public ito;

  function deploy() public onlyOwner {

    address manager = 0xd6561BF111dAfe86A896D6c844F82AE4a5bbc707;

    token = new Token();

    preITO = new PreITO();
    ito = new ITO();

    commonConfigure(preITO);
    commonConfigure(ito);

    preITO.setWallet(0x3047e47EfC33cF8f6F9C3bdD1ACcaEda75B66f2A);
    preITO.setStart(1530622800);
    preITO.addMilestone(5000, 5000000000000000000000, 90);

    token.setSaleAgent(preITO);

    ito.setWallet(0xC82a75f20B94DD6E043569E03A3eeE91A2B1bEfe);
    ito.setStart(1540645200);
    preITO.addMilestone(1000, 2000000000000000000000, 30);
    preITO.addMilestone(1000, 1950000000000000000000, 30);
    preITO.addMilestone(2000, 1800000000000000000000, 30);
    preITO.addMilestone(3000, 1750000000000000000000, 30);
    preITO.addMilestone(3400, 1600000000000000000000, 30);
    preITO.addMilestone(4000, 1550000000000000000000, 30);
    preITO.addMilestone(4500, 1500000000000000000000, 30);
    preITO.addMilestone(5000, 1450000000000000000000, 30);
    preITO.addMilestone(6000, 1400000000000000000000, 30);
    preITO.addMilestone(8000, 1000000000000000000000, 30);

    ito.addWallet(0xe129b76dF45bFE35FE4a3fA52986CC8004538C98, 6);
    ito.addWallet(0x26Db091BF1Bcc2c439A2cA7140D76B4e909C7b4e, 2);
    ito.addWallet(0x3C1c878C99A0155224190E9daefA79F5a4836F7f, 15);
    ito.addWallet(0x2A3b94CB5b9E10E12f97c72d6B5E09BD5A0E6bF1, 12);

    preITO.setNextSaleAgent(ito);

    token.transferOwnership(manager);
    preITO.transferOwnership(manager);
    ito.transferOwnership(manager);
  }

  function commonConfigure(AssembledCommonSale sale) internal {
    sale.setPercentRate(100);
    sale.setMinInvestedLimit(100000000000000000);
    sale.setToken(token);
  }

}

