const mongoose = require('mongoose');

const note_schema = new mongoose.Schema({
    title: String,
    body: String,
    author: String,
    user_id: ObjectId
})


module.exports = mongoose.model("note", note_schema);
