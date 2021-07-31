const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 5000;
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api', require('./api/api'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
