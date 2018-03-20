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
        avatar: { type: String, default:"https://avatars0.githubusercontent.com/u/15261454?s=400&u=9a2f860823a4fb8ccd401ecf89b5dfd240cb8ced&v=4"},
        following: [],
        followers: [],
        posts: [],
        projects:[],
        location:String,
        bootcamp:String,
        bio:[],
        linkdinID: String,
        hire: Boolean 
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
