import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';
import EVMRevert from '../helpers/EVMRevert';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, wallets) {
  let token;
  let crowdsale;

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  beforeEach(async function () {
    token = await Token.new();
    crowdsale = await Crowdsale.new();
    await token.setSaleAgent(crowdsale.address);
    await crowdsale.setToken(token.address);
    await crowdsale.setStart(latestTime());
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
    await crowdsale.addWallet(wallets[3], this.AdvisorsTokensPercent);
    await crowdsale.addWallet(wallets[4], this.BountyTokensPercent);   
    await crowdsale.addWallet(wallets[5], this.TeamTokensPercent);
    await crowdsale.addWallet(wallets[6], this.EndusersTokensPercent);
    await crowdsale.setPercentRate(this.PercentRate);
    //await crowdsale.lockAddress(wallets[5], 180);
  });

  it('should correctly calculate bonuses for advisors, bounty, team, end-users wallets', async function () {
    await crowdsale.sendTransaction({value: this.softcap, from: wallets[1]});
    await crowdsale.sendTransaction({value: ether(1), from: wallets[2]});
    const owner = await crowdsale.owner();
    await crowdsale.finish({from: owner});

    const firstInvestorTokens = await token.balanceOf(wallets[1]);
    const secondInvestorTokens = await token.balanceOf(wallets[2]);
    const AdvisorsTokens = await token.balanceOf(wallets[3]);
    const BountyTokens = await token.balanceOf(wallets[4]);
    const TeamTokens = await token.balanceOf(wallets[5]);
    const EndusersTokens = await token.balanceOf(wallets[6]);
    const totalTokens = firstInvestorTokens
      .plus(secondInvestorTokens)
      .plus(AdvisorsTokens)
      .plus(BountyTokens)
      .plus(TeamTokens)
      .plus(EndusersTokens);

    assert.equal(Math.round(AdvisorsTokens.mul(this.PercentRate).div(totalTokens)), this.AdvisorsTokensPercent);
    assert.equal(Math.round(BountyTokens.mul(this.PercentRate).div(totalTokens)), this.BountyTokensPercent);
    assert.equal(Math.round(TeamTokens.mul(this.PercentRate).div(totalTokens)), this.TeamTokensPercent);
    assert.equal(Math.round(EndusersTokens.mul(this.PercentRate).div(totalTokens)), this.EndusersTokensPercent);  
  });

}
