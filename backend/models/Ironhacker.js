const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const PassportLocalMongoose = require('passport-local-mongoose');

const ironhackerSchema = new Schema(
    {
        firstName:String,
        lastName: String,
        username: String,
        password:String,
        email: String,
        avatar: { type: String, default: "" },
        following: [],
        followers: [],
        posts: [],
        projects:[]

    },
    {
        timestamps:{
            createdAt:"created_at",
            updatedAt:"updated_at"
        }
    }
    );

userSchema.plugin(PassportLocalMongoose, {usernameField:"email"});

module.exports = mongoose.model("User", userSchema);
