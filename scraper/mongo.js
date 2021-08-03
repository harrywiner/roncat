const mongoose = require('mongoose')
const Wotd = require('./models/wotd')
require('dotenv').config()

const uri = process.env.MONGO_URI

// inserts words if it doesn't already exist
async function upsertWotds(json) {
    try {
        if (!uri) throw new Error("Mongo URI not defined")
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
            .catch(err => { console.error("Connection error: ", err) })
        var promises = []
        for (word of json) {
            var existingWord = await Wotd.findOne(word)
            if (!existingWord) {
                var newWord = new Wotd(word)
                promises.push(newWord.save())
            }
        }
        console.log(`Inserting ${promises.length} new words`)
        Promise.all(promises)
            .then(() => {
                console.log("Insertion complete")
                mongoose.connection.close()
            })
            .catch(err => {
                console.error(err)
                mongoose.connection.close()
            })

    } catch (err) {
        console.error(err)
        mongoose.connection.close()
    }
}

module.exports = upsertWotds