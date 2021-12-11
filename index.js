//Database
const {DB} = require(__dirname+'/database/Database.js');

//Functions
const Func = require(__dirname+'/src/GeneralFunctions.js');
const Color = require(__dirname+'/src/ConsoleColors.js');

//Express
const express = require('express');
const app = express();
const port = process.env.PORT || 1135;
const socket = require("socket.io");
const path = require("path");

//Other
const Keygen = require('crypto');
const axios = require('axios');
const convert = require('xml-js');

app.use("/styles", express.static(__dirname + '/styles'));
app.use(express.urlencoded({extended: true}))

let ActiveSockets = [];
const Server = app.listen(port, () =>
{
    console.log(Color.yellow+"API Service - "+`Listening on port: ${port}`);
})
const io = socket(Server);
