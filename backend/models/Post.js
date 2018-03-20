const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const PostSchema = new Schema(
    {

    title: { type: String, required: '{PATH} is required!'},
	body: { type: String, required: '{PATH} is required!'},
	created_at: { type: Date, default: Date.now },
	updated_at: { type: Date, default: Date.now }
    
    });


PostSchema.pre('save', function(next){
  now = new Date();
  this.updated_at = now;
  next();
});

module.exports = mongoose.model('Post', postSchema);
