"use strict";

const app = require("express")(),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    express = require("express"),
    methodOverride = require("method-override"),
    mongoose = require("mongoose"),
    router = express.Router(),
    server = require("http").Server(app),
    io = require("socket.io")(server),
    inventoryRouter = require("./routes/inventoryRouter"),
    userRouter = require("./routes/userRouter"),
    userSocket = require("./sockets/userSocket");

const port = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost/survivors");

app.use(bodyParser.urlencoded({"extended": true}));
app.use(bodyParser.json());
app.use(cors());
app.use(methodOverride());

io.on("connection", function (socket){
    userSocket.initSocket(socket);
});

router.get("/", function (req, res) {
    res.json({"message": "Welcome to Survivors API !"});
});

router.use(function (req, res, next) {
    next();
});

app.use("/", router);
app.use("/user", userRouter);
app.use("/inventory", inventoryRouter);

app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.status(500).json({"error": err.message});
});

server.listen(port, function () {
    console.log("Starting server on port " + port);
});

module.exports = server;
