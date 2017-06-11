/**
 * Created by Arnaud on 17/05/2017.
 */

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CampSchema = new Schema({
    _equipment: [{
        _equipementType: String,
        _equipmentLocationX: Number,
        _equipmentLocationY: Number,
    }],
    _chests : [{
        _itemName: String,
        _itemDescription: String,
        _itemType: Number
    }]
});

module.exports = mongoose.model("Camp", CampSchema, "camp");