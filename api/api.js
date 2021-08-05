const router = require('express').Router()
const { concat } = require('./src/concat.js').default;
const tools = require('./src/tools')
const Wotd = require('./models/wotd')
const { body, validationResult } = require('express-validator')
const Boom = require('@hapi/boom')

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
 * 
 * Algorithm: 
 * If the most recent words are ones of type "USR", return them as the two words (todo)
 * Otherwise, if "UD" is two words, return them 
 * Otherwise return "UD", "OED"
 */
router.get('/wotd', async (req, res, next) => {
    try {

        var wotds = await tools.getWotds().catch(err => { next(err) })

        // todo assure doesn't error if no word
        const USR = wotds.filter(word => { return word.type === "USR" })[0]

        if (USR) {
            var words = USR.word.split(' ')

            if (words.length >= 2) {
                const result = concat(words[0], words[1])

                var wordA = new Wotd({ ...USR })
                var wordB = new Wotd({ ...USR })

                wordA.word = words[0]
                wordB.word = words[1]
                return res.status(200).send({
                    wordA,
                    wordB,
                    result
                })
            }
        }

        const UD = wotds.filter(word => { return word.type === "UD" })[0]
        const OED = wotds.filter(word => { return word.type === "OED" })[0]

        var words = UD.word.split(' ')
        // if the Urban dictionary term is 2 words long (or more) then concat them both
        if (words.length >= 2) {
            const result = concat(words[0], words[1])

            var wordA = new Wotd({ ...UD })
            var wordB = new Wotd({ ...UD })

            wordA.word = words[0]
            wordB.word = words[1]
            return res.status(200).send({
                wordA,
                wordB,
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

/**
 * Body Example
 * {
 *  wordA: "Sample"
 *  wordB: "Word"
 * }
 * Takes and processes words and inserts them into database
 */
router.post('/wotd',
    body().not().isEmpty(),
    body("wordA").not().isEmpty(),
    body("wordB").not().isEmpty(),
    (req, res, next) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(Boom.badRequest("Request body invalid", { errors: errors.array() }))
        }

        tools.insertWotds(req.body)
            .then(() => {
                res.status(200).send("Wotds inserted")
            })
            .catch(err => {
                next(err)
            })
    })

module.exports = router