const mongoose = require('mongoose')

const wotdSchema = new mongoose.Schema({
    word: { type: String, required: true },
    link: { type: String },
    type: { type: String },
    date: { type: String }
})

const Wotd = mongoose.model("wotd", wotdSchema)
module.exports = Wotd