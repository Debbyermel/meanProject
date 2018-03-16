const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedSchema = new Schema(
{ 
    body: {type: String, required: [true, "can't be empty"]},
    user_id: {type: Schema.Types.ObjectId, ref: "User"},
    username: String,
    date: Date
}
);
module.exports = mongoose.model('Feed', feedSchema);