const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    content: String,
    image: String,
}, { collection: "posts" })

const Postme = mongoose.model("Postme", postSchema);

module.exports = { Postme }