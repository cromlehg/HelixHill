![HelixHill](logo.png "HelixHill")

# HelixHill smart contract

* _Standard_                                                                            : [ERC20](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md)
* _[Name](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#name)_            : HelixHill
* _[Ticker](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#symbol)_        : HILL
* _[Decimals](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md#decimals)_    : 18
* _Emission_                                                                            : Mintable
* _Crowdsales_                                                                          : 2
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
1. _Token_ - 
2. _ITO_ -

### Features
* Manually mint tokens by owner or sale agent at any time until token minting finished. 
* Manually mint tokens in ether value by owner or sale agent at corresponding sale contract during current sale processing.  
* Can stop by owner

### Crowdsale stages

#### PreITO
* _Minimal insvested limit_     : 0.1 ETH
* _Softcap_                     : 2000 ETH
* _Start_                       : Jule 03 2018 13-00 GMT
* _Wallet_                      : 0x3047e47EfC33cF8f6F9C3bdD1ACcaEda75B66f2A

1. 115 days, 5000 tokens per ETH, 5000 ETH
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

