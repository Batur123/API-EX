//Database
const {db} = require(__dirname+'/database/database_control.js');

//Functions
const Func = require(__dirname+'/src/functions.js');
const Color = require(__dirname+'/src/console_colors.js');

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

let activeSockets = [];

const Server = app.listen(port, () => {
    console.log(Color.yellow + "API Service - " + `Listening on port: ${port}`);
});
const io = socket(Server);

//Middleware
io.use((socket, next) => {
    console.log(Color.green + "[Handshake]: " + Color.magenta + " " + socket.handshake.address.substring(2).split(":")[1] + Color.green + " trying to connect to the socket. It's API Key: " + Color.magenta + " " + socket.handshake.headers.authorization);

    if (typeof socket == 'undefined' || typeof socket.handshake == 'undefined' || typeof socket.handshake.headers == 'undefined' || typeof socket.handshake.headers.authorization == 'undefined') {
        return next(new Error("Err 624"));
    }

    if (!Boolean(Func.APIKeyDogrula(socket.handshake.headers.authorization))) {
        return next(new Error("Err 625"));
    }

    activeSockets.push({
        id: socket.id,
        ip: socket.handshake.address.substring(2).split(":")[1],
        apikey: socket.handshake.headers.authorization
    });
    return next();
});

io.on("connection", function (socket) {
    socket.on('disconnect', () => {
        activeSockets.filter(word => word.id !== socket.id);
        console.log(Color.yellow+'[Disconnection]:'+Color.green+'This ID disconnected from socket: '+Color.magenta+" "+socket.id);
    });
});

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/', (req, res) => {
    //test (req.headers['x-forwarded-for'] || req.socket.remoteAddress).split(':').pop()
    res.sendFile(__dirname + '/index.html');
});

app.post('/notice', function (req, res) {
    let API = Func.CheckApiKey(req.body.apikey);
    let UserInput = req.body.apikey;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({errcode: 313, msg: "Err1"});
    }

    if (typeof UserInput == 'undefined' || !Boolean(UserInput)) {
        return res.status(400).send({errcode: 314, msg: "Err2"});
    }

    if (UserInput.length !== API.length) {
        return res.status(400).send({errcode: 314, msg: "Err3"});
    }

    if (!Keygen.timingSafeEqual(Buffer.from(UserInput), Buffer.from(API))) {
        return res.status(400).send({errcode: 314, msg: "Err4"});
    }

    if (!Func.CheckIfEmpty(req.body.IPAdresi)) {
        return res.status(400).send({errcode: 315, msg: "Err5"});
    }

    if (!Func.IpAdresKontrol(req.body.IPAdresi)) {
        return res.status(400).send({errcode: 312, msg: "Err6"});
    }

    //snip


});
