"use strict";

const express = require("express");
const User = require("../model/user");

const userRouter = express.Router();

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
    User.findOne({ _nickname: req.body._nickname, _password: req.body._password}, function(err, user) {
        if (err) {
            next(err);
        }
        else {
            res.json(user);
        }
    });
});

userRouter.post("/register", function(req, res, next) {
    User.find({ $or:[ {"_email":req.body._email}, {"_nickname":req.body._nickname} ]},
        function(err, user){
            if (err) {
                next(err);
            }
            else {
                if (user.length === 0) {
                    req.body._health = 100;
                    req.body._hunger = 100;
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
        userFromDatabase._email = req.body._email;
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