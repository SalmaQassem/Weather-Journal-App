// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log(`Server running on port: ${port}`);
}

//GET route
app.get('/all', getDataFromServer);

function getDataFromServer(req, res) {
    console.log(projectData);
    res.send(projectData);
}

//POST route
app.post('/add', postDataToServer);

function postDataToServer(req, res) {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        content: req.body.content,
        city: req.body.city,
        country: req.body.country,
        weather: req.body.weather,
    }
    console.log(projectData);
    res.send(projectData);
}