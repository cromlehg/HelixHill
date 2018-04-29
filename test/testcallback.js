import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import callback from './testcallback/callback';

const token = artifacts.require('Token.sol');
const crowdsale = artifacts.require('ITO.sol');
const callbacktest = artifacts.require('CallbackTest.sol');

contract('Callback test', function (accounts) {
  before(config);
  callback(token, crowdsale, callbacktest, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('03 Jul 2018 00:00:00 GMT');
  this.period = 415;
  this.softcap = ether(2000);
  this.minInvestedLimit = ether(0.1);
  this.wallet = '0x3047e47EfC33cF8f6F9C3bdD1ACcaEda75B66f2A';
  this.BountyTokensWallet = '0x26Db091BF1Bcc2c439A2cA7140D76B4e909C7b4e';
  this.AdvisorsTokensWallet = '0xe129b76dF45bFE35FE4a3fA52986CC8004538C98';
  this.FoundersTokensWallet = '0x3C1c878C99A0155224190E9daefA79F5a4836F7f';
  this.CompanyTokensWallet = '0x2A3b94CB5b9E10E12f97c72d6B5E09BD5A0E6bF1';
  this.BountyTokensPercent = 2;
  this.AdvisorsTokensPercent = 6;
  this.FoundersTokensPercent = 15;
  this.CompanyTokensPercent = 12;
  this.PercentRate = 100;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
