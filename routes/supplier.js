var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const mysql = require('mysql');
const BigNumber = require('bignumber.js');

var crypto = require('crypto'),
    format = require('biguint-format');

function randomC (qty) {
    var x= crypto.randomBytes(qty);
    return format(x, 'dec');
}
function random (low, high) {
    return randomC(4)/Math.pow(2,4*8-1) * (high - low) + low;
}

// MySQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.database_user,
    password: process.env.database_password,
    database: 'distrack'
});

connection.connect(function(err) {
    if (!err) {
        console.log('Connected to MySql!\n');
    } else {
        console.log('Not connected to MySql.\n');
        console.log(err);
    }
});


//Web3 connection
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
console.log(`Talking with a geth server ${web3.version.api} \n`);

const abiArray = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_assetId",
				"type": "string"
			},
			{
				"name": "_supplierId",
				"type": "string"
			}
		],
		"name": "addAssetsToSupplier",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "completedOperation",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_id",
				"type": "string"
			},
			{
				"name": "_name",
				"type": "string"
			},
			{
				"name": "_latitude",
				"type": "string"
			},
			{
				"name": "_longitude",
				"type": "string"
			},
			{
				"name": "_altitude",
				"type": "string"
			}
		],
		"name": "createSupplier",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "initialize",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "firstAid",
				"type": "string"
			},
			{
				"name": "foodPack",
				"type": "string"
			},
			{
				"name": "waterPack",
				"type": "string"
			},
			{
				"name": "_latitude",
				"type": "string"
			},
			{
				"name": "_longitude",
				"type": "string"
			},
			{
				"name": "_altitude",
				"type": "string"
			}
		],
		"name": "request",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "checkStatus",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "a",
				"type": "string"
			},
			{
				"name": "b",
				"type": "string"
			}
		],
		"name": "compareStrings",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_id",
				"type": "string"
			}
		],
		"name": "getSupplierDetails",
		"outputs": [
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "string"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "v",
				"type": "uint256"
			}
		],
		"name": "uintToString",
		"outputs": [
			{
				"name": "str",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const address = '0xbbdb065065218d0a67d5e63031f0dcbc6cab787f';

const contract = web3.eth.contract(abiArray);

const contractInstance = contract.at(address);
web3.eth.defaultAccount = web3.eth.coinbase;

router.post('/create', (req,res) => {
  let name = req.body.name;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let altitude = req.body.altitude;
  var id=crypto.randomBytes(2).toString('hex');
  //console.log(name,latitude,longitude,altitude);
  let ok = contractInstance.createSupplier(id, name, latitude, longitude, altitude,
                                                        { from: web3.eth.accounts[0], gas: 5000000 });
    if(!ok) {
        return res.status(400).send('Error');
    }
    console.log(`Successfully added ${id} to Blockchain \n`);
    connection.query('INSERT INTO SUPPLIER VALUES (?,?,?,?,?)', [id, name, latitude, longitude, altitude], (error, results) => {
      if (error) {
            console.log(error);
            return res.status(400);
        }
      res.send("Succcess");
    });
});

router.get('/get', (req,res) => {
  let resultString=`{\"supplier\":[`;
  connection.query('SELECT * FROM SUPPLIER', [], (error, results) => {
        if (error) {
            console.log(error);
            return res.status(400);
        }
        if (results.length) {
            for(i=0;i<results.length;i++)
              {
                let ok = contractInstance.getSupplierDetails(results[i].id, { from: web3.eth.accounts[0], gas: 3000000 });
                  if(!ok) {
                      return res.status(400).send('Error');
                  }
                resultString += `{\"id\":\"${results[i].id}\",\"name\":\"${ok[0]}\",\"latitude\":\"${ok[1]}\",\"longitude\":\"${ok[2]}\",\"altitude\":\"${ok[3]}\",\"firstAid\":\"${ok[4]}\",\"foodPack\":\"${ok[5]}\",\"waterPack\":\"${ok[6]}\"}`;
                if(i!=results.length-1){
                  resultString+=`,`;
                }
              }
              resultString+=`]}`;
              res.send(resultString);
        }
    });
});

router.post('/addAssetsToSupplier', (req,res) => {
  let supplierId = req.body.supplierId;
  let assetId = req.body.assetId;
  let ok = contractInstance.addAssetsToSupplier(assetId,supplierId, { from: web3.eth.accounts[0], gas: 3000000 });
    if(!ok) {
        return res.status(400).send('Error');
    }
  res.send("Succcess");
});

// router.get('/asset', (req,res) => {
//   let resultString=`{\"supplier\":[`;
//   connection.query('SELECT * FROM ASSETS', [] ,(error,results) => {
//     if (error) {
//         console.log(error);
//         return res.status(400);
//     }
//     if(results.length){
//       for(i=0;i<results.length;i++){
//         let ok = contractInstance.getAssetDetails(results[i].id, { from: web3.eth.accounts[0], gas: 3000000 });
//           if(!ok) {
//               return res.status(400).send('Error');
//           }
//           resultString+=`{\"id\":\"${results[i].id}\",\"name\":\"${ok[0]}\",\"expire\":\"${ok[1]}\"}`;
//           if(i!=results.length-1){
//             resultString+=`,`;
//           }
//       }
//       resultString+=`]}`;
//       res.send(resultString);
//     }
//   });
// });

// router.post('/createAsset', (req,res) => {
//   let name = req.body.name;
//   let expire = req.body.expire;
//   var id=crypto.randomBytes(3).toString('hex');
//   console.log(name,expire);
//   let ok = contractInstance.createAsset(id, name, expire,
//                                                         { from: web3.eth.accounts[0], gas: 3000000 });
//     if(!ok) {
//         return res.status(400).send('Error');
//     }
//     console.log(`Successfully added ${name} to Blockchain \n`);
//     connection.query('INSERT INTO ASSETS VALUES (?)', [id], (error, results) => {
//       if (error) {
//             console.log(error);
//             return res.status(400);
//         }
//       res.send("Succcess");
//     });
// });

router.post('/request' , (req,res) => {
  let firstAid = req.body.firstAid;
  let foodPack = req.body.foodPack;
  let waterPack = req.body.waterPack;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let altitude = req.body.altitude;
  console.log(req);
  let ok = contractInstance.request(latitude, longitude, altitude, firstAid, foodPack, waterPack,
                                                        { from: web3.eth.accounts[0], gas: 3000000 });
    if(!ok) {
        return res.status(400).send('Error');
    }
    console.log(ok[0]);
    return res.send(ok[0]);

    // var io = req.app.get('socketio');


});


router.post('/availability', (req,res) => {
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let altitude = req.body.altitude;
  var firstAid=0;
  var foodPack=0;
  var waterPack=0;
  //console.log(`latitude: ${latitude}, longitude: ${longitude}, altitude: ${altitude}`);
  connection.query('Select * from SUPPLIER', [] , (error, results) => {
    if (error) {
          console.log(error);
          return res.status(400);
      }
    for(i=0;i<results.length;i++){
      //Itterate through the result and make calls to the Blockchain and append in to a list and then convert into a json object
      //console.log(results[i].id);
      let ok = contractInstance.getSupplierDetails(results[i].id, { from: web3.eth.accounts[0], gas: 3000000 });
      if(!ok) {
          return res.status(400).send('Error');
      }
      //console.log(ok[4].toNumber());
      firstAid+=ok[4].toNumber();
      foodPack+=ok[5].toNumber();
      waterPack+=ok[6].toNumber();
    }
    console.log(`First Aid ${firstAid}, foodPack ${foodPack}, waterPack ${waterPack}`);
    res.status(200).send(JSON.parse(JSON.stringify(`{\"firstAid\":\"${firstAid}\",\"foodPack\":\"${foodPack}\",\"waterPack\":\"${waterPack}\"}`)))
  });
});

module.exports = router;
