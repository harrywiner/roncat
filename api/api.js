const router = require('express').Router()
const { concat } = require('./src/concat.js').default;
const tools = require('./src/tools')

router.get('/', (req, res) => {
    res.send("Hello and welcome to my API! \n to properly query use the following format: \n https://path.com/concat/wordA/wordB")
})

router.get('/:wordA/:wordB', (req, res) => {
    var wordA = req.params.wordA
    var wordB = req.params.wordB

    var newWord = concat(wordA, wordB)

    res.send(`${newWord}`)
})

/**
 * return 2 words 
 * if UD has 2 words then return each of those 
 * if UD has 1, return OED, UD
 * 
 * {
 *  wordA: {word: "Some", link: "example.com" ... } ,
 *  wordB: {word: "Word", link: "example.org" ... },
 *  result: "Sord"
 * }
 */
router.get('/wotd', async (req, res, next) => {
    try {

        var wotds = await tools.getWotds().catch(err => { next(err) })

        const UD = wotds.filter(word => { return word._id === "UD" })[0]
        const OED = wotds.filter(word => { return word._id === "OED" })[0]

        var words = UD.word.split(' ')
        // if the Urban dictionary term is 2 words long (or more) then concat them both
        if (words.length >= 2) {
            const result = concat(words[0], words[1])
            return res.status(200).send({
                wordA: words[0],
                wordB: words[1],
                result
            })
        } else {
            const result = concat(UD.word, OED.word)
            return res.status(200).send({
                wordA: UD,
                wordB: OED,
                result,
            })
        }
    } catch (err) {
        next(err)
    }
})

module.exports = router