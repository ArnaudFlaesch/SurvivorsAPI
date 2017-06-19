"use strict";

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    "_email": String,
    "_nickname": String,
    "_password": String,
    "_health": Number,
    "_hunger": Number,
    "_latitude": Number,
    "_longitude": Number,
    "_inventory": [{
        "_name": String,
        "_description": String,
        "_type": Number
    }]
});

module.exports = mongoose.model("User", UserSchema, "user");
