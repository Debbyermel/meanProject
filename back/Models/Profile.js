const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
    {   
        user: {type: Schema.Types.ObjectId, ref: "User"},
        firstName: String,
        lastName: String,
        username:{ type:String, trim:true },
        password:String,
        email: String,
        country: String,
        campus: String,
        avatar: { type: String, default: "http://cdn.onlinewebfonts.com/svg/img_518099.png" },
        githubID: String,
        followers:Object,
        following:Object,
         projects:{
         link: String, required: [true, "link can't be empty"],
         nameOfProject: String,
          desc: String
        }
     }
    );
 
module.exports = mongoose.model('Profile', profileSchema);