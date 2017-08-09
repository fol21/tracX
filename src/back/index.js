const express = require('express');
const mongoose = require('mongoose');

const config = require("./resources/config.json")

const app = express();
const AccessController = require('./src/Controllers/AccessController.js');


const options = { useMongoClient: true, 
                server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } }; 

mongoose.connect(config.db.databaseURL, options);
const conn = mongoose.connection;  

conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
  console.log('ready');                         
});


app.use(config.service.route, AccessController.init(express.Router()));


app.listen(config.service.port, function () {
    console.log('Listening to port ' + config.service.port.toString());
});