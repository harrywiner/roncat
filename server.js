const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json())

const axios = require('axios')
axios.defaults.baseURL = `http://localhost:${PORT}`

/**
 * Routes
 */
const api = require('./api/api')
app.use('/api', api)
app.use('/concat', api)

/**
 * Main app
 */
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

/**
 * Error handler
 */
app.use((err, req, res, next) => {
    console.error("Error caught by Express: ", err)
    if (res.headersSent)
        return next(err)
    res.status(500).send(err.message)
})

/**
 * Setup DB Connection
 */

const MONGO_URI = process.env.MONGO_URI
require('mongoose').connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Mongoose Connected!") })
    .catch(err => { console.error("Connection error: ", err) })
