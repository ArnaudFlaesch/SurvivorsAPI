"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = express.Router();
const userRouter = require("./routes/user");
const port = process.env.PORT || 3000;
mongoose.connect("mongodb://localhost/survivors");

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

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

server.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

server.listen(port);
console.log("Starting server on port " + port);