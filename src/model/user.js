var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    nickname: String,
    password: String
});

module.exports = mongoose.model("User", UserSchema, "user");
