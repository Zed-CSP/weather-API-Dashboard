// 5 day weather forecast dashboard

// API constants
const weatherApiKey = "64c0c09d2aaed1a2868153c4c9060aa4";
const weatherApiURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const geocoderApiURL = "https://api.openweathermap.org/geo/1.0/direct?q=";
// DOM constants
const cityListEl = document.getElementById("cityList");
const search = document.getElementById("search");
const searchBtnEl = document.getElementById("searchBtn");
const searchListEl = document.getElementById("searches");

// Global variables

var cityList = [];


// Functions
// function getWeather() {
//     // use city name to get lat/lon with geocoder api
    
//     try {
//         const geoResponse = await fetch(geoCoderApiURL + cityList[0] + weatherApiKey)
//         if (!geoResponse.ok) {
//             throw new Error("Unable to connect to OpenWeather");
//         }
            
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (data) {
//                 console.log(data);
//                 // save data in an object
//                 const cityLocObj = {
//                     city: data[0].name,
//                     lat: data[0].lat,
//                     lon: data[0].lon
//                 }
//                 console.log(cityLocObj);
//                 //push cityLocObj to cityList
//                 cityList.push(cityLocObj);
//                 console.log(cityList);
//                 // use lat/lon to get 5 day forecast
//                 fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=64c0c09d2aaed1a2868153c4c9060aa4')
//                     .then(function (response) {
//                         //console.log(response);
//                         if (response.ok) {
//                             return response.json();
//                         }
//                         else {
//                             alert("Error: " + response.statusText);
//                         }
//                     })
//                     .catch(function (error) {
//                         console.log(error);
//                         alert("Unable to connect to OpenWeather");
//                     })
//                     .then(function (data) {
//                         console.log(data);
//                         // save data in an object
//                         const cityWeatherObj = {
//                             city: cityLocObj.city,
//                             date: data.list[0].dt_txt,
//                             icon: data.list[0].weather[0].icon,
//                             temp: data.list[0].main.temp,
//                             humidity: data.list[0].main.humidity,
//                             wind: data.list[0].wind.speed,
//                             uv: data.list[0].main.uvi
//                         }
//                         console.log(cityWeatherObj);


//                         // save data to local storage
//                         localStorage.setItem("cityWeatherObj", JSON.stringify(cityWeatherObj));
//                         getCityList();
//                         // return data
//                         return cityWeatherObj;
//                     }
//                 );    
//             }
//         );
//     } 
//     .catch(error => {console.error("error fetching data:", error)});
//     // use lat/lon to get 5 day forecast
//     // save data in an object
//     // save data to local storage
//     // return data
// }

async function fetchWeather() {
    const city = document.getElementById('cityInput').value;
    const pastCities = getPastCities();

    if (!pastCities.includes(city)) {
        pastCities.push(city);
        savePastCities(pastCities);
    }
    try {
        const response = await fetch(`${weatherApiURL}?q=${city}&appid=${weatherApiKey}`);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error(error);
    }
}

function savePastCities(pastCities) {
    localStorage.setItem('pastCities', JSON.stringify(pastCities));
}

function getPastCities() {
    const pastCities = localStorage.getItem('pastCities');
    return pastCities ? JSON.parse(pastCities) : [];
}

function displayPastCities() {
    const pastCities = getPastCities();
    const pastCitiesElement = document.getElementById('pastCities');

    pastCitiesElement.innerHTML = '';

    pastCities.forEach(city => {
        const cityElement = document.createElement('button');
        cityElement.textContent = city;
        cityElement.addEventListener('click', () => {
            document.getElementById('cityInput').value = city;
            fetchWeather();
        });

        pastCitiesElement.appendChild(cityElement);
    });
}

searchBtnEl.addEventListener("click", function () {
    // check if city is already in city list
    if (cityList.includes(search.value)) {
        alert("City already in list");
    }
    // if not, add city to city list
    let city = search.value;
    cityList.push(city);
    console.log(cityList);
    getWeather();
    // get city name from input
    // add city to city list
    // save city list
    localStorage.setItem("cityList", JSON.stringify(cityList));
    // display city list
    displayCityList();
});

// event listener for city list buttons:
searchListEl.addEventListener("click", function (event) {
    // get city name from button
    let city = event.target.textContent;
    console.log(city);
    // get weather data for city
    getWeather(city);
    // display weather data
    displayWeather();
});

