const Wotd = require('../models/wotd')
require('dotenv').config()
const { DateTime } = require("luxon");




function MostRecentWordsPipeline() {
    return [
        {
            '$sort': {
                'date': -1
            }
        }, {
            '$group': {
                '_id': '$type',
                'date': {
                    '$max': '$date'
                },
                'doc': {
                    '$first': '$$ROOT'
                }
            }
        }, {
            '$replaceRoot': {
                'newRoot': '$doc'
            }
        }
    ]
}

module.exports = {
    getWotds() {
        // returns most recent words
        return Wotd.aggregate(MostRecentWordsPipeline()).catch(err => { throw err })
    },
    async insertWotds(payload) {
        /** payload: {
         *     wordA: "Some"
         *     wordB: "Word"
         * }
         */
        var words = ""
        for (var key in payload) {
            words += payload[key] + " "
        }
        words = words.substring(0, words.length - 1)

        var word = new Wotd({
            word: words,
            date: DateTime.now().ts,
            type: "USR"
        })
        word.save()
    }
}


