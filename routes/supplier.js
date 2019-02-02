var express = require('express');
var router = express.Router();
const Web3 = require('web3');
const mysql = require('mysql');

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
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
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
				"type": "string[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

const address = '0xe08e398f9110e01540d71aaa447a1e95ad9a4f35';

const contract = web3.eth.contract(abiArray);

const contractInstance = contract.at(address);
web3.eth.defaultAccount = web3.eth.coinbase;

router.post('/getSuppliers', (req, res) => {
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let altitude = req.body.altitude;
    console.log(`latitude: ${latitude}, longitude: ${longitude}, altitude: ${altitude}`);
    res.send({
        latitude: latitude,
        longitude: longitude,
        altitude: altitude
    });
});

router.post('/create', (req,res) => {
  let name = req.body.name;
  let latitude = req.body.latitude;
  let longitude = req.body.longitude;
  let altitude = req.body.altitude;
  var id="123";
  console.log(name,latitude,longitude,altitude);
  let ok = contractInstance.createSupplier(id, name, latitude, longitude, altitude,
                                                        { from: web3.eth.accounts[0], gas: 3000000 });
    if(!ok) {
        return res.status(400).send('Error');
    }
    console.log(`Successfully added ${name} to Blockchain \n`);
    connection.query('INSERT INTO SUPPLIER VALUES (?,?,?,?,?)', [id, name, latitude, longitude, altitude], (error, results) => {
      if (error) {
            console.log(error);
            return res.status(400);
        }
      res.send("Succcess");
    });
})

router.post('/get', (req,res) => {

});

module.exports = router;
