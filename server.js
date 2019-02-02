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

var supplier = require('./routes/supplier');

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

app.use(express.static(__dirname + '/views'));

app.get('/', (req,res) => {
  res.sendFile('views/index.html', { root: __dirname });
})

app.use('/supplier',supplier);

const port = process.env.PORT || 8080;

app.listen(port, (req, res) => {
    console.log(`Listening to port ${port}...`);
});
