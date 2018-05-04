import ether from './helpers/ether';
import tokens from './helpers/tokens';
import {advanceBlock} from './helpers/advanceToBlock';
import {increaseTimeTo, duration} from './helpers/increaseTime';
import latestTime from './helpers/latestTime';
import EVMRevert from './helpers/EVMRevert';

const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(web3.BigNumber))
  .should();

const Configurator = artifacts.require('Configurator.sol');
const Token = artifacts.require('Token.sol');
const ITO = artifacts.require('ITO.sol');

contract('Configurator integration test', function (accounts) {
  let configurator;
  let token;
  let ito;

  const manager = '0xd6561BF111dAfe86A896D6c844F82AE4a5bbc707';

  before(async function () {
    // Advance to the next block to correctly read time in the solidity "now" function interpreted by testrpc
    await advanceBlock();
    configurator = await Configurator.new();
    await configurator.deploy();

    const tokenAddress = await configurator.token();
    const itoAddress = await configurator.ito();

    token = await Token.at(tokenAddress);
    ito = await ITO.at(itoAddress);
  });

  it('contracts should have token address', async function () {
    const tokenOwner = await token.owner();
    tokenOwner.should.bignumber.equal(manager);
  });

  it('contracts should have ITO address', async function () {
    const itoOwner = await ito.owner();
    itoOwner.should.bignumber.equal(manager);
  });

  it('ITO should have start time as described in README', async function () {
    const itoStart = await ito.start();
    itoStart.should.bignumber.equal((new Date('03 Jul 2018 13:00:00 GMT')).getTime() / 1000);
  });

  it ('ITO should have softcap as described in README', async function () {
    const itoSoftcap = await ito.softcap();
    itoSoftcap.should.bignumber.equal(ether(2000));
  });

  it ('ITO should have minimal insvested limit as described in README', async function () {
    const itoMinInvest = await ito.minInvestedLimit();
    itoMinInvest.should.bignumber.equal(ether(0.1));
  });

  it ('ITO should have wallets as described in README', async function () {
    const itoWallet = await ito.wallet();
    itoWallet.should.bignumber.equal('0x3047e47EfC33cF8f6F9C3bdD1ACcaEda75B66f2A');
  });

  it ('advisors, bounty, team, end-users wallets should be as described in README', async function () {
    const advisorsWallet = await ito.wallets(0);
    advisorsWallet.should.bignumber.equal('0xe129b76dF45bFE35FE4a3fA52986CC8004538C98');
    const bountyWallet = await ito.wallets(1);
    bountyWallet.should.bignumber.equal('0x26Db091BF1Bcc2c439A2cA7140D76B4e909C7b4e');
    //const teamWallet = await ito.wallets(2);
    //teamWallet.should.bignumber.equal('0x3C1c878C99A0155224190E9daefA79F5a4836F7f');
    const endusersWallet = await ito.wallets(3);
    endusersWallet.should.bignumber.equal('0x2A3b94CB5b9E10E12f97c72d6B5E09BD5A0E6bF1');
  });

});

