var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    _email: String,
    _nickname: String,
    _password: String,
    _health: Number,
    _hunger: Number,
    _latitude: Number,
    _longitude: Number,
    _bag : [{
        _itemName: String,
        _itemDescription: String,
        _itemType: Number
    }]
});

module.exports = mongoose.model("User", UserSchema, "user");