"use strict";

const express = require("express"),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    cors = require("cors"),
    mongoose = require("mongoose"),
    userRouter = require("./routes/userRouter"),
    app = require("express")(),
    server = require("http").Server(app),
    router = express.Router(),
    io = require("socket.io")(server),
    userSocket = require("./sockets/userSocket"),
    port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/survivors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride());

io.on("connection", function(socket){
    socket.on("playerLoggedIn", function(data) {
        socket.broadcast.emit("playerLoggedIn", data);
    });
});


router.get("/", function(req, res) {
    res.json({ message: "Welcome to Survivors API !" });
});

router.use(function(req, res, next) {
    next();
});

app.use("/", router);
app.use("/user", userRouter);

app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(500).json({ error : err.message});
});

server.listen(port);
console.log("Starting server on port " + port);

module.exports = server;