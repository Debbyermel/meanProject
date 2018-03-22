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
            default:"IRONHACKER"
        },
        firstName:String,
        lastName: String,
        avatar: { type: String, default:"https://pbs.twimg.com/profile_images/922856272332054528/UB_AjsnV_400x400.jpg"},
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
