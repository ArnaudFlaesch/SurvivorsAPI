/**
 * Created by Arnaud on 17/05/2017.
 */

"use strict";

const mongoose = require("mongoose"),
    Schema = mongoose.Schema,

    CampSchema = new Schema({
        "_equipment": [{
            "_equipementType": String,
            "_equipmentLocationX": Number,
            "_equipmentLocationY": Number
        }],
        "_chests ": [{
            "_itemName": String,
            "_itemDescription": String,
            "_itemType": Number
        }]
    });

module.exports = mongoose.model("Camp", CampSchema, "camp");
