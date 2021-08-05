const concat = require('../concat.js').default
const fs = require('fs')
const path = require('path')
var jsonPath = path.join(__dirname, 'tords.json')
const tords = JSON.parse(fs.readFileSync(jsonPath))

// todo is type checking?

test.each(tords)('$wordA $wordB. $expected', (obj) => {

    expect(concat(obj.wordA, obj.wordB)).toBe(obj.expected)
})