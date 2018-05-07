import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, TeamWallet, wallets) {
  let token;
  let crowdsale;
  let teamwallet;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    teamwallet = await TeamWallet.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
    await crowdsale.setSoftcap(this.softcap);
    await crowdsale.setMinInvestedLimit(this.minInvestedLimit);   
    await crowdsale.addMilestone(2000, tokens(5000), 146);
    await crowdsale.addMilestone(1000, tokens(2000), 30);
    await crowdsale.addMilestone(1000, tokens(1950), 30);
    await crowdsale.addMilestone(2000, tokens(1800), 30);
    await crowdsale.addMilestone(3000, tokens(1750), 30);
    await crowdsale.addMilestone(3500, tokens(1600), 30);
    await crowdsale.addMilestone(4000, tokens(1550), 30);
    await crowdsale.addMilestone(4500, tokens(1500), 30);
    await crowdsale.addMilestone(5000, tokens(1450), 30);
    await crowdsale.addMilestone(6000, tokens(1400), 30);
    await crowdsale.addMilestone(8000, tokens(1000), 30);
    await crowdsale.setWallet(this.wallet);    
    await crowdsale.addWallet(this.AdvisorsTokensWallet, this.AdvisorsTokensPercent);
    await crowdsale.addWallet(this.BountyTokensWallet, this.BountyTokensPercent);   
    await crowdsale.addWallet(teamwallet.address, this.TeamTokensPercent);
    await crowdsale.addWallet(this.EndusersTokensWallet, this.EndusersTokensPercent);
    await crowdsale.setPercentRate(this.PercentRate);
    await crowdsale.setTeamWallet(teamwallet.address);
    await teamwallet.setToken(token.address);
    await teamwallet.setCrowdsale(crowdsale.address);
    await teamwallet.setLockPeriod(180);
  });

  it('should deny refunds before end', async function () {
    await crowdsale.sendTransaction({value: ether(1), from: wallets[3]});
    await crowdsale.refund({from: wallets[3]}).should.be.rejectedWith(EVMRevert);
  });

  it('should deny refunds after end if goal was reached', async function () {
    await crowdsale.sendTransaction({value: this.softcap, from: wallets[3]});
    await increaseTimeTo(latestTime() + this.period);
    await crowdsale.refund({from: wallets[3]}).should.be.rejectedWith(EVMRevert);
  });

  it('should allow refunds after end if goal was not reached', async function () {
    const owner = await crowdsale.owner();
    const investment = this.softcap.minus(1);
    await crowdsale.sendTransaction({value: investment, from: wallets[3]});
    await increaseTimeTo(latestTime() + this.period);
    await crowdsale.finish({from: owner});
    const balance = await crowdsale.balances(wallets[3]);
    balance.should.be.bignumber.equal(investment);
    const pre = web3.eth.getBalance(wallets[3]);
    await crowdsale.refund({from: wallets[3], gasPrice: 0}).should.be.fulfilled;
    const post = web3.eth.getBalance(wallets[3]);
    post.minus(pre).should.be.bignumber.equal(investment);
  });

  it('should correctly calculate refund', async function () {
    const owner = await crowdsale.owner();
    const investment1 = ether(1);
    const investment2 = ether(2);
    await crowdsale.sendTransaction({value: investment1, from: wallets[3]});
    await crowdsale.sendTransaction({value: investment2, from: wallets[3]});
    await increaseTimeTo(latestTime() + this.period);
    await crowdsale.finish({from: owner});
    const pre = web3.eth.getBalance(wallets[3]);
    await crowdsale.refund({from: wallets[3], gasPrice: 0}).should.be.fulfilled;
    const post = web3.eth.getBalance(wallets[3]);
    post.minus(pre).should.bignumber.equal(investment1.plus(investment2));
  });

  it('should forward funds to wallets after end if goal was reached', async function () {
    const owner = await crowdsale.owner();
    const investment = this.softcap;
    await crowdsale.sendTransaction({value: investment, from: wallets[3]});
    await increaseTimeTo(latestTime() + this.period);
    const pre = web3.eth.getBalance(this.wallet);
    await crowdsale.finish({from: owner}).should.be.fulfilled;
    const post = web3.eth.getBalance(this.wallet);
    const dev = web3.eth.getBalance('0xEA15Adb66DC92a4BbCcC8Bf32fd25E2e86a2A770');  
    dev.should.be.bignumber.equal(7500000000000000000);
    post.minus(pre).plus(dev).should.be.bignumber.equal(investment);
  });

  it('should forward funds to dev wallet just once', async function () {
    const owner = await crowdsale.owner();
    const investment = this.softcap;
    const dev = 7500000000000000000;
    await crowdsale.sendTransaction({value: investment, from: wallets[3]});
    const pre = web3.eth.getBalance(this.wallet);
    const predev = web3.eth.getBalance('0xEA15Adb66DC92a4BbCcC8Bf32fd25E2e86a2A770');
    await crowdsale.withdraw({from: owner}).should.be.fulfilled;
    const post = web3.eth.getBalance(this.wallet);
    const postdev = web3.eth.getBalance('0xEA15Adb66DC92a4BbCcC8Bf32fd25E2e86a2A770');  
    postdev.minus(predev).should.be.bignumber.equal(dev);
    post.minus(pre).plus(dev).should.be.bignumber.equal(investment);
    await crowdsale.sendTransaction({value: investment, from: wallets[3]});
    await crowdsale.withdraw({from: owner}).should.be.fulfilled;
    const post1 = web3.eth.getBalance(this.wallet);
    const postdev1 = web3.eth.getBalance('0xEA15Adb66DC92a4BbCcC8Bf32fd25E2e86a2A770');  
    postdev1.should.be.bignumber.equal(postdev);
    post1.minus(post).should.be.bignumber.equal(investment);
  });  
}
