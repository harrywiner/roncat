const Wotd = require('../models/wotd')
require('dotenv').config()

const MostRecentWordsPipeline = [
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

module.exports = {
    getWotds() {
        // returns most recent words
        return Wotd.aggregate(MostRecentWordsPipeline).catch(err => { throw err })
    }
}


