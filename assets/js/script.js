// 5 day weather forecast dashboard

// API constants
const weatherApiKey = "FILLLATER";
const weatherapiURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const geocoderApiKey = "FILLATER";
const geocoderapiURL = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

// DOM constants


// Global variables
var city = "";
var cityList = [];

// Functions
function getWeather(city) {
    // use city name to get lat/lon with geocoder api
    fetch(geocoderapiURL + city + "&appid=" + geocoderApiKey)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        });

    // use lat/lon to get 5 day forecast
    // save data in a variable
    // save data to local storage
    // return data
}