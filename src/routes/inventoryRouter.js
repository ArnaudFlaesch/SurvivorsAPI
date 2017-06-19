/**
 * Created by arnaud on 19/06/17.
 */

"use strict";

const express = require("express"),
    User = require("../model/user");

const inventoryRouter = express.Router();

inventoryRouter.use(function (req, res, next) {
    next();
});

inventoryRouter.get("/:user_id", function (req, res, next) {
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            next(err);
        }
        res.json(user._inventory);
    });
});

inventoryRouter.post("/:user_id", function (req, res, next) {
    User.findById(req.params.user_id, function (err, userFromDatabase) {
        if (err) {
            next(err);
        }
        if (userFromDatabase._inventory == undefined) {
            userFromDatabase._inventory = [];
        }
        userFromDatabase._inventory.push(req.body);
        userFromDatabase.save(function (err) {
            if (err) {
                next(err);
            }
            res.send(userFromDatabase._inventory);
        });
    });
});

inventoryRouter.post("/delete/:user_id", function (req, res, next) {
    User.findById(req.params.user_id, function (err, userFromDatabase) {
        if (err) {
            next(err);
        }
        userFromDatabase._inventory = userFromDatabase._inventory.filter(function (item) {
            return (item._id != req.body._id);
        });
        userFromDatabase.save(function (err) {
            if (err) {
                next(err);
            }
            res.json(userFromDatabase._inventory);
        });
    });
});

module.exports = inventoryRouter;
