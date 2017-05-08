"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");

const server = express();
const router = express.Router();
const port = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost/survivors");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());
server.use(methodOverride());

router.get("/", function(req, res) {
    res.json({ message: "Welcome to Survivors API !" });
});

router.use(function(req, res, next) {
    next();
});

server.use("/", router);
server.use("/user", userRouter);

server.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

server.use(function (err, req, res, next) {
    res.status(500).send({ error : err.message});
});

server.listen(port);
console.log("Starting server on port " + port);

module.exports = server;