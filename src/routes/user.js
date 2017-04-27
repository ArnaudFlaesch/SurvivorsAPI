"use strict";

var express = require("express");
var userRouter = express.Router();

var User = require("../model/user");

userRouter.use(function(req, res, next) {
    next();
});

userRouter.post("/login", function(req, res) {
    User.findOne(req.body, function (err, doc){
        res.send(doc);
    });
});

userRouter.post("/register", function(req, res) {
    User.create(req.body, function(err, doc) {
        res.send(doc);
    });
});

module.exports = userRouter;