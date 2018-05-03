pragma solidity ^0.4.18;

import './ownership/Ownable.sol';
import './AssembledCommonSale.sol';
import './Token.sol';
import './ITO.sol';

contract Configurator is Ownable {

  Token public token;
  ITO public ito;

  function deploy() public onlyOwner {

    address manager = 0xd6561BF111dAfe86A896D6c844F82AE4a5bbc707;

    token = new Token();
    ito = new ITO();

    token.setSaleAgent(ito);

    ito.setStart(1530622800);
    ito.addMilestone(5000, 5000000000000000000000, 115);
    ito.addMilestone(1000, 2000000000000000000000, 30);
    ito.addMilestone(1000, 1950000000000000000000, 30);
    ito.addMilestone(2000, 1800000000000000000000, 30);
    ito.addMilestone(3000, 1750000000000000000000, 30);
    ito.addMilestone(3400, 1600000000000000000000, 30);
    ito.addMilestone(4000, 1550000000000000000000, 30);
    ito.addMilestone(4500, 1500000000000000000000, 30);
    ito.addMilestone(5000, 1450000000000000000000, 30);
    ito.addMilestone(6000, 1400000000000000000000, 30);
    ito.addMilestone(8000, 1000000000000000000000, 30);
    ito.setSoftcap(2000000000000000000000);
    ito.setMinInvestedLimit(100000000000000000);
    ito.setWallet(0x3047e47EfC33cF8f6F9C3bdD1ACcaEda75B66f2A);
    ito.addWallet(0xe129b76dF45bFE35FE4a3fA52986CC8004538C98, 6);
    ito.addWallet(0x26Db091BF1Bcc2c439A2cA7140D76B4e909C7b4e, 2);
    ito.addWallet(0x3C1c878C99A0155224190E9daefA79F5a4836F7f, 15);
    ito.addWallet(0x2A3b94CB5b9E10E12f97c72d6B5E09BD5A0E6bF1, 12);
    ito.setPercentRate(100);
    ito.setToken(token);

    token.transferOwnership(manager);
    ito.transferOwnership(manager);
  }

}

