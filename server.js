// use registerHelper to send data to website

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const Web3 = require('web3');
const bodyParser = require('body-parser');

const app = express();

// Body-parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Logging all the calls made to the function
app.use((req, res, next) => {
    let date = new Date();
    let log = `${date}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log');
        }
    })
    next();
});

// Uncomment this code if the server is in maintenance mode
/* app.use((req, res, next) => {
    res.render('maintenance.hbs');
}); */

// Web3 connection
// const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
// console.log(`Talking with a geth server ${web3.version.api} \n`);
//
// const abiArray = [
//
// ];
//
// const address = '';
//
// const contract = web3.eth.contract(abiArray);
//
// const contractInstance = contract.at(address);
// web3.eth.defaultAccount = web3.eth.coinbase;

// hbs.registerPartials(__dirname + '/views/partials');
//
// app.set('view engine', 'hbs');


/**
 * Description: Report a disaster
 * Request:     POST /getSuppliers
 * Send:        JSON object which contains latitude, longitude, altitude
 * Receive:     200 if successful, 400 otherwise
 */

app.post('/getSuppliers', (req, res) => {
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

const port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
    console.log(`Listening to port ${port}...`);
});
