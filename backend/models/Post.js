const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const PostSchema = new Schema(
    {
    author:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    title: { type: String, required: true},
    body: { type: String, required: true},
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() },
    likes: { type: Number, default: 0 },
    likedBy: { type: Array },
    comments: [{
        comment: { type: String },
        commentator: { type: String }
      }] 
    });




module.exports = mongoose.model('Post', PostSchema);
