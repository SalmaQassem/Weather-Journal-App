/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = ',&appid=bc36c084d65d5d582e8d455e6afb1c49&units=imperial';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
let index = d.getMonth();
let newDate = `${months.at(index)} ${d.getDate()} ${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getData);

/* Function called by event listener */
function getData() {
    const feelings = document.getElementById('feelings').value;
    const zipCode = document.getElementById('zip').value;
    makeGetRequest(zipCode).then((data) => {
        let postedData = {
            temp: Math.round(data.main.temp),
            date: newDate,
            content: feelings,
            city: data.name,
            country: data.sys.country,
            weather: data.weather[0].description,
        }
        postData('http://localhost:8000/add', postedData)
        retrieveData()
    })
}

/* Function to GET Web API Data*/
let makeGetRequest = async (zipCode) => {
    try {
        let res = await fetch(baseUrl + zipCode + apiKey);
        let data = await res.json();
        console.log("data from make get request");
        console.log(data);
        return data;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

/* Function to POST data */
let postData = async (url = "", data = {}) => {
    let res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        let postData = await res.json();
        console.log("data from post data");
        console.log(postData);
        return postData;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
}

/* Function to GET Project Data */
const retrieveData = async () => {
    const req = await fetch('http://localhost:8000/all');
    try {
        // Transform into JSON
        const allData = await req.json();
        console.log("data from retrieve data");
        console.log(allData);
        // Write updated data to DOM elements
        document.getElementById('region').innerHTML = `${allData.city}, ${allData.country}`;
        document.getElementById('temp').innerHTML = Math.round(allData.temp) + '\u00B0';
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('weather').innerHTML = allData.weather;
        document.getElementById('content').innerHTML = `how i feel today: ${allData.content}`;
    } catch (error) {
        console.log(`Error: ${error}`);
        // appropriately handle the error
    }
}