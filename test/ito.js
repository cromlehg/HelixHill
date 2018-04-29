import ether from './helpers/ether';
import tokens from './helpers/tokens';
import unixTime from './helpers/unixTime';
import {duration} from './helpers/increaseTime';

import refundable from './ito/refundable';
import common from './ito/common';
import bounty from './ito/bounty';
import milestonebonus from './ito/milestonebonus';
import additional from './ito/additional';

const token = artifacts.require('Token.sol');
const crowdsale = artifacts.require('ITO.sol');


contract('ITO - common test', function (accounts) {
  before(config);
  common(token, crowdsale, accounts);
});

contract('ITO - refundable crowdsale test', function (accounts) {
  before(config);
  refundable(token, crowdsale, accounts);
});

contract('ITO - bounty test', function (accounts) {
  before(config);
  bounty(token, crowdsale, accounts);
});

contract('ITO - milestonebonus features test', function (accounts) {
  before(config);
  milestonebonus(token, crowdsale, accounts);
});

contract('ITO - additional features test', function (accounts) {
  before(config);
  additional(token, crowdsale, accounts);
});

function config() {
  // variables list based on info from README
  this.start = unixTime('03 Jul 2018 00:00:00 GMT');
  this.period = 415;
  this.price = tokens(1000);
  this.softcap = ether(2000);
  this.minInvestedLimit = ether(0.1);
  this.wallet = '0x3047e47EfC33cF8f6F9C3bdD1ACcaEda75B66f2A';
  this.AdvisorsTokensWallet = '0xe129b76dF45bFE35FE4a3fA52986CC8004538C98';
  this.BountyTokensWallet = '0x26Db091BF1Bcc2c439A2cA7140D76B4e909C7b4e';
  this.TeamTokensWallet = '0x3C1c878C99A0155224190E9daefA79F5a4836F7f';
  this.EndusersTokensWallet = '0x2A3b94CB5b9E10E12f97c72d6B5E09BD5A0E6bF1';
  this.AdvisorsTokensPercent = 6;
  this.BountyTokensPercent = 2;
  this.TeamTokensPercent = 15;
  this.EndusersTokensPercent = 12;
  this.PercentRate = 100;

  // variables for additional testing convinience
  this.end = this.start + duration.days(this.period);
  this.beforeStart = this.start - duration.seconds(10);
  this.afterEnd = this.end + duration.seconds(1);
}
