import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';
import unixTime from '../helpers/unixTime';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, CallbackTest, wallets) {
  let token;
  let crowdsale;
  let callbacktest;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    callbacktest = await CallbackTest.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await token.transferOwnership(wallets[1]);

    await crowdsale.setSoftcap(this.softcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);   
    await crowdsale.addMilestone(tokens(5000), tokens(5000), 115);
    await crowdsale.addMilestone(tokens(1000), tokens(2000), 30);
    await crowdsale.addMilestone(tokens(1000), tokens(1950), 30);
    await crowdsale.addMilestone(tokens(2000), tokens(1800), 30);
    await crowdsale.addMilestone(tokens(3000), tokens(1750), 30);
    await crowdsale.addMilestone(tokens(3500), tokens(1600), 30);
    await crowdsale.addMilestone(tokens(4000), tokens(1550), 30);
    await crowdsale.addMilestone(tokens(4500), tokens(1500), 30);
    await crowdsale.addMilestone(tokens(5000), tokens(1450), 30);
    await crowdsale.addMilestone(tokens(6000), tokens(1400), 30);
    await crowdsale.addMilestone(tokens(8000), tokens(1000), 30);
    await crowdsale.setWallet(this.wallet);    
    await crowdsale.addWallet(this.BountyTokensWallet, this.BountyTokensPercent);
    await crowdsale.addWallet(this.AdvisorsTokensWallet, this.AdvisorsTokensPercent);    
    await crowdsale.addWallet(this.FoundersTokensWallet, this.FoundersTokensPercent);
    await crowdsale.addWallet(this.CompanyTokensWallet, this.CompanyTokensPercent);
    await crowdsale.setPercentRate(this.PercentRate);   
    //await crowdsale.lockAddress(this.TeamTokensWallet, 180);
  });

  it ('transfer should call tokenFallback for registered contract', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await token.registerCallback(callbacktest.address, {from: wallets[1]});
    const sendvalue = tokens(300);
    await token.transfer(callbacktest.address, sendvalue, {from: wallets[1]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(sendvalue);
    const from = await callbacktest.from();
    from.should.be.bignumber.equal(wallets[1]);
  });

  it ('transfer should not call tokenFallback for not registered contract', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[1]});
    await token.deregisterCallback(callbacktest.address, {from: wallets[1]});
    const sendvalue = tokens(400);
    const oldvalue = await callbacktest.value();
    await token.transfer(callbacktest.address, sendvalue, {from: wallets[1]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(oldvalue);
  });

  it ('transferFrom should call tokenFallback for registered contract', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[2]});
    await token.registerCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(wallets[1], tokens(10000), {from: wallets[2]});
    await crowdsale.finish();
    const sendvalue = tokens(300);
    await token.transferFrom(wallets[2], callbacktest.address, sendvalue, {from: wallets[1]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(sendvalue);
    const from = await callbacktest.from();
    from.should.be.bignumber.equal(wallets[2]);
  });

   it ('transferFrom should not call tokenFallback for not registered contract', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[2]});
    await token.deregisterCallback(callbacktest.address, {from: wallets[1]});
    await token.approve(wallets[1], tokens(10000), {from: wallets[2]});
    await crowdsale.finish();
    const sendvalue = tokens(400);
    const oldvalue = await callbacktest.value();
    await token.transferFrom(wallets[2], callbacktest.address, sendvalue, {from: wallets[1]});
    const value = await callbacktest.value();
    value.should.be.bignumber.equal(oldvalue);
  });
}
