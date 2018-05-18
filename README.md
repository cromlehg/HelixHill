![HelixHill](logo.png "HelixHill")

# HelixHill smart contract

* _Standard_                                                                            : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : HelixHill
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_        : HILL
* _[Decimals](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#decimals)_    : 18
* _Emission_                                                                            : Mintable
* _Crowdsales_                                                                          : 1
* _Fiat dependency_                                                                     : No
* _Tokens locked_                                                                       : Yes

## Smart-contracts description

Extended tokens are minted after the all stages are finished.  
There is a special function to return 3rd party tokens that were sent by mistake (function retrieveTokens()).  
Each stage has a direct minting function in wei. This is made to support the external payment gateways.

### Contracts contains
1. _Token_ - Token contract
3. _ITO_ - ITO contract
4. _Configurator_ - contract with main configuration for production

### How to manage contract
To start working with contract you should follow next steps:
1. Compile it in Remix with enamble optimization flag and compiler 0.4.18
2. Deploy bytecode with MyEtherWallet. Gas 5100000 (actually 5073514).
3. Call 'deploy' function on addres from (3). Gas 4000000 (actually 3979551). 

Contract manager must call finishMinting after each crowdsale milestone!
To support external mint service manager should specify address by calling _setDirectMintAgent_. After that specified address can direct mint tokens by calling _mintTokensByETHExternal_ and _mintTokensExternal_.

### How to invest
To purchase tokens investor should send ETH (more than minimum 0.1 ETH) to corresponding crowdsale contract.
Recommended GAS: 250000, GAS PRICE - 21 Gwei.

### Wallets with ERC20 support
1. MyEtherWallet - https://www.myetherwallet.com/
2. Parity 
3. Mist/Ethereum wallet

EXODUS not support ERC20, but have way to export key into MyEtherWallet - http://support.exodus.io/article/128-how-do-i-receive-unsupported-erc20-tokens

Investor must not use other wallets, coinmarkets or stocks. Can lose money.

## Tokens distribution

* _Advisors tokens percent_     :  6%
* _Bounty tokens percent_       :  2%
* _Team tokens percent_         : 15% (6 month locked)
* _End-users tokens percent_    : 12%
* _For sale tokens percent_     : 65%

## AirDrop feature
* Contains airdrop support contracts

## Main network configuration

* _Advisors tokens wallet_      : 0xe129b76dF45bFE35FE4a3fA52986CC8004538C98
* _Bounty tokens wallet_        : 0x26Db091BF1Bcc2c439A2cA7140D76B4e909C7b4e
* _Team tokens wallet_          : 0x3C1c878C99A0155224190E9daefA79F5a4836F7f
* _End-users tokens wallet_     : 0x2A3b94CB5b9E10E12f97c72d6B5E09BD5A0E6bF1
* _Contracts manager_           : 0xd6561BF111dAfe86A896D6c844F82AE4a5bbc707

### Links
1. _Token_ - https://etherscan.io/token/0x588e9b40c9e16850ea25904d27e2412df72f62c5
2. _ITO_ - https://etherscan.io/address/0x37268a039f845354e293922e0ca7fdd4ef0332f8
3. _TeamWallet_ - https://etherscan.io/address/0x2dafaca37d6a84c5aa3fd800be027c10a5b15747

### Features
* Manually mint tokens by owner or sale agent at any time until token minting finished. 
* Manually mint tokens in ether value by owner or sale agent at corresponding sale contract during current sale processing.  
* Can paused/continued by owner

### Crowdsale stages

#### ITO
* _Minimal insvested limit_     : 0.1 ETH
* _Softcap_                     : 2000 ETH
* _Start_                       : Jule 03 2018 13-00 GMT
* _Wallet_                      : 0x3047e47EfC33cF8f6F9C3bdD1ACcaEda75B66f2A

1. 146 days, 5000 tokens per ETH, 2000 ETH
2. 30 days, 2000 tokens per ETH, 1000 ETH
3. 30 days, 1950 tokens per ETH, 1000 ETH
4. 30 days, 1800 tokens per ETH, 2000 ETH
5. 30 days, 1750 tokens per ETH, 3000 ETH
6. 30 days, 1600 tokens per ETH, 3500 ETH
7. 30 days, 1550 tokens per ETH, 4000 ETH
8. 30 days, 1500 tokens per ETH, 4500 ETH
9. 30 days, 1450 tokens per ETH, 5000 ETH
10. 30 days, 1400 tokens per ETH, 6000 ETH
11. 30 days, 1000 tokens per ETH, 8000 ETH


## Ropsten network configuration 

### Links
1. _Token_ - https://ropsten.etherscan.io/address/0x8bf596f8ee26dcaf991b2033df380c2f3964331c
2. _ITO_ - https://ropsten.etherscan.io/address/0x39a2ab2cd1d00f919029368d46f0950b320354ce
3. _TeamWallet_ - https://ropsten.etherscan.io/address/0xe93c960589d3df89faa9e3a86c9d89164fdd4667


### Crowdsale stages

#### ITO

* _Minimal insvested limit_     : 0.1 ETH
* _Softcap_                     : 1 ETH
* _Start_                       : 07 May 2018 00:00:00 GMT
* _Wallet_                      : 0x8fd94be56237ea9d854b23b78615775121dd1e82
* _Advisors tokens wallet_      : 0x24a7774d0eba02846580A214eeca955214cA776C
* _Bounty tokens wallet_        : 0x8Ba7Aa817e5E0cB27D9c146A452Ea8273f8EFF29
* _Team tokens wallet_          : TeamWallet
* _End-users tokens wallet_     : 0xaa8ed6878a202eF6aFC518a64D2ccB8D73f1f2Ca

* _Advisors tokens percent_     :  6%
* _Bounty tokens percent_       :  2%
* _Team tokens percent_         : 15% (6 month locked)
* _End-users tokens percent_    : 12%

_Milestones_

1. 15 days, 5000 tokens per ETH, 2000 ETH
2. 30 days, 2000 tokens per ETH, 1 ETH
3. 30 days, 1950 tokens per ETH, 1000 ETH
4. 30 days, 1800 tokens per ETH, 2000 ETH
5. 30 days, 1750 tokens per ETH, 3000 ETH
6. 30 days, 1600 tokens per ETH, 3500 ETH
7. 30 days, 1550 tokens per ETH, 4000 ETH
8. 30 days, 1500 tokens per ETH, 4500 ETH
9. 30 days, 1450 tokens per ETH, 5000 ETH
10. 30 days, 1400 tokens per ETH, 6000 ETH
11. 30 days, 1000 tokens per ETH, 8000 ETH

##### Purchasers

* 1 ETH => 5,000 tokens (milestone 1), gas = 176668
https://ropsten.etherscan.io/tx/0x85964214bed8664a6bf98a29cf1d8dcd10a9d926b2ef2acb89b52a05989c372c

* 1 ETH => 2,000 tokens (milestone 2, milestone 1 is closed because of ending period), gas = 102520
https://ropsten.etherscan.io/tx/0x93b8793911728dd5336f1472c0aa21ea8ea3b9bac69e487a562542bb955e7737

* 1 ETH => 1,950 tokens (milestone 3, milestone 2 is closed bacuase of reached hardcap), gas = 83977
https://ropsten.etherscan.io/tx/0x34b6441f59b898aaa134dd3f8dc59deb8b395c446af5692d5ce9eff73ed1074a

* 1 ETH => rejected txn, ITO paused, gas = 23838
https://ropsten.etherscan.io/tx/0x71ddf4fc969e0417f02a2d863560ae1d8a457327ecfe40d8f782d6934e854211

* 1 ETH => 1,950 token (continue ITO), gas = 68977
https://ropsten.etherscan.io/tx/0x6036af9217c585194d2ba76ea1ec75432c48a26b2525638bf79f5438cca5d7ab

##### Service operations

* setStart, gas = 28154
https://ropsten.etherscan.io/tx/0x51ee111c30f9dad647c16bde0bc236befb816b0625b831814352bd4068a6022e

* pauseITO, gas = 27147
https://ropsten.etherscan.io/tx/0x79f54ec8875f32740945bf8b654b0d4fdd8fd2eaa04b649e020e2edac06679f7

* continueITO, gas = 27471
https://ropsten.etherscan.io/tx/0x92de4c656e3d0574faafc352fd2e958fa046326daf8ed2d816cb87f60bb9e64c

* finish, gas = 323467
https://ropsten.etherscan.io/tx/0x924bb7ecc87efdab7b4f79dfa3d60e0a1a61d2c38b8de65b6cc9b8360c25974e

### Token holders
https://ropsten.etherscan.io/token/0x8bf596f8ee26dcaf991b2033df380c2f3964331c#balances

##### Token transfers

* withdrawTokens => rejected txn, Team Wallet is locked, gas = 23589
https://ropsten.etherscan.io/tx/0x3355f49019ef41f1f0b8975b6294637b6238d3e216a0904f76ec3d95683b2b37
