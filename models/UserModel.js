const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    fullname: {type: String},
    email: {type: String},
    phonenumber: {type: Number},
    username: {type: String},
    password: {type: String},
    role: {type: String},
});

const UserModel = mongoose.model("user", UserModelSchema);

module.exports = UserModel;