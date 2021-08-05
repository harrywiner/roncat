const Wotd = require('../models/wotd')
require('dotenv').config()

const MostRecentWordsPipeline = [
    {
        $group: {
            _id: "$type",
            date: {
                $max: "$date"
            },
            word: { "$first": "$word" },
            link: { "$first": "$link" }
        }
    },

]

module.exports = {
    getWotds() {
        // returns most recent words
        return Wotd.aggregate(MostRecentWordsPipeline).catch(err => { throw err })
    }
}


