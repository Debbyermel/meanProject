const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const PassportLocalMongoose = require('passport-local-mongoose');

const ironhackerSchema = new Schema(
    {
        firstName:String,
        lastName: String,
        avatar: { type: String, default: "http://www.petwave.com/-/media/Images/Center/Breed/Dogs/Toy-Group/Brussels-Griffon/Brussels-Griffon.ashx?w=450&hash=D41C87B628F9C64059A16E8BECCF966F6E82638E" },
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
