import ether from '../helpers/ether';
import tokens from '../helpers/tokens';
import {advanceBlock} from '../helpers/advanceToBlock';
import {increaseTimeTo, duration} from '../helpers/increaseTime';
import latestTime from '../helpers/latestTime';

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

export default function (Token, Crowdsale, TeamWallet, wallets) {
  let token;
  let crowdsale;
  let teamwallet;
  const milestones = [
    {hardcap: ether(2000), price: tokens(5000), day: 145},
    {hardcap: ether(1000), price: tokens(2000), day: 29},
    {hardcap: ether(1000), price: tokens(1950), day: 29},
    {hardcap: ether(2000), price: tokens(1800), day: 29},
    {hardcap: ether(3000), price: tokens(1750), day: 29},
    {hardcap: ether(3500), price: tokens(1600), day: 29},
    {hardcap: ether(4000), price: tokens(1550), day: 29},
    {hardcap: ether(4500), price: tokens(1500), day: 29},
    {hardcap: ether(5000), price: tokens(1450), day: 29},
    {hardcap: ether(6000), price: tokens(1400), day: 29},
    {hardcap: ether(8000), price: tokens(1000), day: 29}
  ];

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
  });

  before(async function () {
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

  milestones.forEach((milestone, i) => {
    it(`price should be ${milestone.price / 1000000000000000000} tokens per eth for milestone #${i}`, async function () {
      await increaseTimeTo(latestTime() + duration.days(milestone.day));
      await crowdsale.sendTransaction({value: ether(1), from: wallets[i]});
      const balance = await token.balanceOf(wallets[i]);
      const value = milestone.price;
      balance.should.be.bignumber.equal(value);
    });
  });

}
