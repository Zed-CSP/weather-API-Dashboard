// 5 day weather forecast dashboard

// API constants
const weatherApiKey = "64c0c09d2aaed1a2868153c4c9060aa4";
const weatherapiURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const geocoderapiURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

// DOM constants
const cityListEl = document.getElementById("cityList");
let search = document.getElementById("search");
let searchBtnEl = document.getElementById("searchBtn");

// Global variables

var cityList = [];


// Functions
function getWeather() {
    // use city name to get lat/lon with geocoder api
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=64c0c09d2aaed1a2868153c4c9060aa4')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // use lat/lon to get 5 day forecast
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=64c0c09d2aaed1a2868153c4c9060aa4')
                .then(function (response) {
                    console.log(response);
                    return response.json();
                })

        });

    // use lat/lon to get 5 day forecast
    // save data in a variable
    // save data to local storage
    // return data
}

function displayWeather(data) {
    // display data on page
}

function getCityList() {
    // get city list from local storage
    // return city list
}

function saveCityList() {
    // save city list to local storage
}

function displayCityList() {
    // display city list on page
}

function addCity() {
    // get city name from input
    // add city to city list
    // save city list
    // display city list
}

function clearCityList() {
    // clear city list
    // clear local storage
    // display city list
}

function displayCity() {
    // get city name from button
    // get weather data for city
    // display weather data
}

// Event listeners
// event listener for search button:

searchBtnEl.addEventListener("click", function () {

    getWeather();


    // get city name from input
    let city = search.value;

    // add city to city list
    cityList.push(city);

    // save city list
    localStorage.setItem("cityList", JSON.stringify(cityList));

    // display city list
    displayCityList();
});
