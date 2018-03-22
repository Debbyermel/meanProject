const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const PassportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema(
    {
        username: String,
        name:String,
        email: String,
        role:{
            type:String,
            enum:["GUEST", "ADMIN", "IRONHACKER"],
            default:"GUEST"
        },
        firstName:String,
        lastName: String,
        avatar: { type: String, default:"http://telegram.org.ru/uploads/posts/2017-10/1509306863_logo_white.png"},
        following: [],
        followers: [],
        posts: [],
        projectOne: String, 
        projectTwo: String, 
        projectThree: String, 
        location:String,
        bootcamp:String,
        bio:[],
        hire: Boolean,
        secretWord: {type: String, default: "MEAN"}
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
