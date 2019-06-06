<div align="center">

  ![DisTrack](https://i.imgur.com/j0ocDe5.jpg)

  [![Hackathon](https://img.shields.io/badge/hackathon-KJSCE-orange.svg)](http://hackit.csikjsce.org/) 
  [![Status](https://img.shields.io/badge/status-active-green.svg)]() 
  [![Github Issues](https://img.shields.io/github/issues/kylelobo/DisTrack.svg)](https://github.com/kylelobo/DisTrack/issues) 
  [![Pending Pull-Requests](https://img.shields.io/github/issues-pr/kylelobo/DisTrack.svg)](https://github.com/kylelobo/DisTrack/pulls) 
  [![License](https://img.shields.io/badge/license-GNU-blue.svg)](LICENSE)

</div>

---

<p align="center">A machine-to-machine (M2M) automated system, designed to fulfil to the needs of people in disasters.</p>

# Table of Contents
+ [About](#description)
+ [Demo / Working](#demo)
+ [Use Cases](#use_cases)
+ [Getting Started](#getting_started)
+ [Deployment](#deployment)
+ [Limitations](#limitations)
+ [Future Scope](#future_scope)
+ [Contributing](#contributing)
+ [Authors](#authors)
+ [Inspiration](#inspiration)

## About <a name="description"></a>
+ The IoT represents one of the major pillars of greater automation efforts, but can easily be hacked. This could potentially lead to disastrous consequences, like for example with self driving cars. What if machines operate autonomously on the blockchain? What if machines only need to interact with other machines? Can we create ecosystems where the machines work together beneficial for society?
+ In this repo, we propose a way to let drones operate on blockchain. These drones could be used for a wide variety of [tasks](#use_cases), from exploring planets in the far future, to well coordinated search and rescue missions in the present day.
+ We planned to go with a different approach for this hackathon. Rather than a traditional _"thinking of solutions for clients"_ approach where people are primarily focused on business and money, we plan to envision the world of tomorrow.
+ Any entity can get services from autonomous objects such as drones, vehicles, etc.
+ We have a global identity system which is decentralized. This is because a centralized system is too valuable of a target.
+ We plan to implement a proof-of-concept system employing a blockchain-based decentralized application where machines have agreements and comunicate each other, unlike the tradional scenario wherein a central authority owns the system.

## Demo / Working <a name="demo"></a>

<div align="center">

  ![Process](https://i.imgur.com/X7Yvlyq.gif)

</div>

1. One drone is constantly scanning a small area for any signs of a disaster.
2. A disaster occurs at some location. The 1st drone then informs the ledger about this disaster.
3. Based on the availablitiy of drones, a food package drone is sent out to the location in order to drop several food packages.

## Use Cases <a name="use_cases"></a>
+ Search & rescue in case of disasters - In this scenario, there are multiple drones that are scouting for any sign of disaster. As soon as a disaster is encountered, these drones can trigger some action. For eg, food package carrier drones can come and assist them.
+ In the field of research, drones can be sent out to remote locations to scout and gather data. They can be given tokens as a digital incentive and this can be at the cost of their batteries.
+ Building houses/buildings using drones.
+ Wildlife prevention - Drones hunting for hunters (poachers).
+ Food delivery - If you want some food to be delivered to your house, you just hire a drone to do the job for you.
+ In the future, drones can be sent out for planetary observation.

Thus, in the future world, us humans are liberated from performing tedious, hard, and especially dangerous tasks.

## Getting Started <a name="getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
What things you need to install the software and how to install them
Installing NodeJs
```
$ sudo apt-get install nodejs
```
Installing [Android Studio](https://developer.android.com/studio/)

### Installing
A step by step series of examples that tell you how to get a development env running

Cloning the repo
```
$ git clone https://github.com/kylelobo/DisTrack.git
```
Installing the dependencies
```
$ cd DisTrack
$ npm install
```
Running the server
```
$ node server.js
```

## Deployment <a name="deployment"></a>
**1. Instantiate your data directory**
```
geth --datadir ./myDataDir init ./myGenesis.json
```

**2. Start your Ethereum peer node.**

+ Networkid helps ensure the privacy of your network. You can use any number here (where we used “1114”), but other peers joining your network must use the same one.
```
geth --datadir ./myDataDir --networkid 1114 console 2>> myEth.log
```
+ Output should look like this:
```
Welcome to the Geth JavaScript console!

instance: Geth/v1.7.3-stable-4bb3c89d/darwin-amd64/go1.8.3
coinbase: 0xae13d41d66af28380c7af6d825ab557eb271ffff
at block: 5 (Thu, 07 Dec 2017 17:08:48 PST)
datadir: /Users/test/my-eth-chain/myDataDir
modules: admin:1.0 clique:1.0 debug:1.0 eth:1.0 miner:1.0 net:1.0 personal:1.0 rpc:1.0 txpool:1.0 web3:1.0

>
```
This is the geth JavaScript console. Any command with the symbol > should be typed here.

**3. Display your Ethereum logs**

+ Open another terminal window
+ ```cd my-eth-chain```
+ Type ```tail -f myEth.log```

**4. Import/Create an Account**

+ If you allocated ETH in the Genesis file, import the corresponding account by dragging the UTC file into the ```myDataDir/keystoredirectory``` and skip to step 5.
+ In the geth JavaScript console, create an account:
```
> personal.newAccount("<YOUR_PASSPHRASE>")
```
+ Do not forget this passphrase! You will be typing this a lot, so for this test network you can keep it simple.

**5. Set Default Account**
+ Check your default account, type
```
> eth.coinbase
```
+ If this address is the same as the one from step 4, skip the rest of step 5.
+ To set your default account, type 
```
> miner.setEtherbase(web3.eth.accounts[0])
```

**6. Start mining**
+ Check your balance with 
```
> eth.getBalance(eth.coinbase)
```
+ Run 
```
> miner.start()
```
+ Look at your other terminal window, you should see some mining action in the logs. Check your balance again and it should be higher.
+ To end mining, type
```
> miner.stop()
```

## Built With <a name="built_with"></a>
Mobile App:
+ [Android Studio](https://developer.android.com/studio/) - Android app
+ [NodeJs](https://nodejs.org/en/) - Server Environment
+ [MySQL](https://dev.mysql.com/downloads/os-linux.html) - Database

Blockchain:
+ [Ethereum](https://www.ethereum.org/) - Blockchain Network
+ [Solidity](https://github.com/ethereum/solidity) - Smart Contracts
+ [Ganache](https://truffleframework.com/ganache) - Create private Ethereum blockchain to run tests

Website:
+ HTML - Markup language for creating web pages
+ CSS - Style Sheet Language
+ JavaScript - Scripting Language for web pages
+ Bootstrap - Templating

## Limitations <a name="limitations"></a>
+ Blockchain databases take a lot of time to query data.
+ Despite the numerous IoT applications developed or currently under development, there is no way to perform micro-transactions (really small payments) without paying fees that in comparison are huge.
+ IoT infrastructure is weak.

## Future Scope <a name="future_scope"></a>
+ Migrating the Blockchain network from Ethereum to Tangle / BigchainDB.
+ Implement digital tokens which can be used to enable M2M economy.

## Contributing <a name="contributing"></a>
1. Fork it (<https://github.com/kylelobo/DisTrack/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Authors <a name="authors"></a>
+ [Calden Rodrigues](https://github.com/caldenrodrigues) <br>
+ [JohnAnand Abraham](https://github.com/johnanand) <br>
+ [Kyle Lobo](https://github.com/kylelobo) <br>
+ [Pratik Nerurkar](https://github.com/PlayPratz) <br>

See also the list of [contributors](https://github.com/kylelobo/DisTrack/contributors) who participated in this project.

## Inspiration <a name="inspiration"></a>
[Eduardo Castello Ferrer](https://www.media.mit.edu/people/ecstll/overview/)
