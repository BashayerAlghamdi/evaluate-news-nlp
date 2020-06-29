const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
// Require the Aylien npm package
var aylien = require("aylien_textapi");

const app = express()
const bodyParser = require('body-parser')
// Cors for cross origin allowance
const cors = require('cors');

app.use(express.static('dist'))

console.log(__dirname)

app.use(cors());

// call aylienapi
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})
//post route
app.post('/add', function(req,res){
    textapi.sentiment({
        'text': req.body.content,
        mode: 'Document'
    }, function(error, response) {
        if (error === null) {
            console.log(response);
            res.send(response)
        }
    })
})
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})
app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

