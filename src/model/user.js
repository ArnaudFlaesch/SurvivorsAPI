var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    nickname: String,
    password: String,
    health: Number,
    hunger: Number,
    latitude: Number,
    longitude: Number,
    bag : [{
        itemName: String,
        itemDescription: String,
        itemType: Number
    }]
});

module.exports = mongoose.model("User", UserSchema, "user");