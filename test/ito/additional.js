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
    await crowdsale.addMilestone(5000, tokens(5000), 115);
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

  it('should mintTokensByETHExternal by owner', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.mintTokensByETHExternal(wallets[4], ether(1), {from: owner}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[4]);
    const current = await crowdsale.currentMilestone();
    const milestone = await crowdsale.milestones(current);
    const price = milestone[1];
    balance.should.bignumber.equal(price);
  });

  it('should mintTokensByETHExternal by Direct Mint Agend', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.setDirectMintAgent(wallets[2], {from: owner});
    await crowdsale.mintTokensByETHExternal(wallets[5], ether(1), {from: wallets[2]}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[5]);
    const current = await crowdsale.currentMilestone();
    const milestone = await crowdsale.milestones(current);
    const price = milestone[1];
    balance.should.bignumber.equal(price);
  });

  it('should mintTokensExternal by owner', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.mintTokensExternal(wallets[4], tokens(100), {from: owner}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[4]);
    balance.should.bignumber.equal(tokens(100));
  });

  it('should mintTokensExternal by Direct Mint Agent', async function () {
    const owner = await crowdsale.owner();
    await crowdsale.setDirectMintAgent(wallets[3], {from: owner});
    await crowdsale.mintTokensExternal(wallets[6], tokens(100), {from: wallets[3]}).should.be.fulfilled;
    const balance = await token.balanceOf(wallets[6]);
    balance.should.bignumber.equal(tokens(100));
  });


  it('should lock team wallet address after finish', async function () {
    const owner = await crowdsale.owner();
    const investment = this.softcap;
    await crowdsale.sendTransaction({value: investment, from: wallets[1]});
    await crowdsale.finish({from: owner});
    const balance = await token.balanceOf(teamwallet.address);
    balance.should.bignumber.greaterThan(tokens(100));
    await teamwallet.withdrawTokens(wallets[7]).should.be.rejectedWith(EVMRevert);
  });

  it('should unlock team wallet address after 180 days', async function () {
    const owner = await crowdsale.owner();
    const investment = this.softcap;
    await crowdsale.sendTransaction({value: investment, from: wallets[1]});
    await crowdsale.finish({from: owner});
    await increaseTimeTo(latestTime() + duration.days(181));
    const walletbalance = await token.balanceOf(teamwallet.address);
    await teamwallet.withdrawTokens(wallets[7]).should.be.fulfilled;   
    const balance = await token.balanceOf(wallets[7]);
    balance.should.bignumber.equal(walletbalance);
  });

}
