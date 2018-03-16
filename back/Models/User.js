const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema(
    {
        firstName:String,
        lastName: String,
        username: String,
        password:String,
        email: String,
        avatar: { type: String, default: "http://cdn.onlinewebfonts.com/svg/img_518099.png" },
    },
    {
        timestamps:{
            createdAt:"created_at",
            updatedAt:"updated_at"
        }
    }
    );

module.exports = mongoose.model("User", userSchema);
