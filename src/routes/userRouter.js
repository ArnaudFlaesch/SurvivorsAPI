"use strict";

var express = require("express");
var userRouter = express.Router();

var User = require("../model/user");

userRouter.use(function(req, res, next) {
    next();
});

userRouter.get("/list", function(req, res, next) {
    User.find(function(err, users) {
        if (err) {
            next(err);
        }
        res.json(users);
    });
});

userRouter.get("/info/:user_id", function(req, res, next) {
    User.findById(req.params.user_id, function(err, user) {
        if (err) {
            next(err);
        }
        res.json(user);
    });
});

userRouter.post("/login", function(req, res, next) {
    User.findOne({ nickname: req.body.nickname, password: req.body.password}, function(err, user) {
        if (err) {
            next(err);
        }
        else {
            res.send(user);
        }
    });
});

userRouter.post("/register", function(req, res, next) {

    User.find({ $or:[ {"email":req.body.email}, {"nickname":req.body.nickname} ]},
        function(err, user){
            if (err) {
                next(err);
            }
            else {
                if (user.length === 0) {
                    User.create(req.body, function(err, user) {
                        if (err) {
                            next(err);
                        }
                        else {
                            res.send(user);
                        }
                    });
                }
                else {
                    next(new Error("L'email ou le pseudo est déjà utilisé."));
                }
            }
        });
});


userRouter.put("/update", function(req, res, next) {
    User.findById(req.body._id, function(err, userFromDatabase) {
        if (err) {
            next(err);
        }
        userFromDatabase.email = req.body.email;
        userFromDatabase.save(function(err) {
            if (err) {
                next(err);
            }
            res.send(req.body);
        });
    });
});

userRouter.delete("/delete/:user_id", function(req, res, next) {
    User.remove({_id: req.params.user_id}, function(err, user) {
        if (err) {
            next(err);
        }
        res.json({ message: "User successfully deleted." });
    });
});

module.exports = userRouter;