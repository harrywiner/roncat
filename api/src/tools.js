const Wotd = require('../models/wotd')
require('dotenv').config()
const { DateTime } = require("luxon");

function MostRecentWordsPipeline() {
    var now = DateTime.now({ zone: "GMT" })
    var midnight = DateTime.utc(now.c.year, now.c.month, now.c.day, 0, 0, 0);
    console.log(midnight.ts)
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
        }, {
            '$match': {
                '$expr': {
                    '$gte': [
                        {
                            '$toLong': '$date'
                        },
                        midnight.ts
                    ]
                }
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


