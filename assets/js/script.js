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

var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var cityList = getPastCities();

// Event listeners

searchBtnEl.addEventListener("click", function (event) {
    event.preventDefault();
    var city = search.value.trim();
    if (city) {
        fetchWeather(city);
        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        search.value = "";
    }
});


// Functions 

function displayWeather(weatherData) {
    const displayElement = document.getElementById('weatherDisplay');
    displayElement.innerHTML = '';

    for (let i = 0; i < weatherData.list.length; i += 8) {
        const date = new Date(weatherData.list[i].dt * 1000);
        const temp = (weatherData.list[i].main.temp - 273.15).toFixed(2);
        const weather = weatherData.list[i].weather[0].description;
        const icon = weatherData.list[i].weather[0].icon;
        const humidity = weatherData.list[i].main.humidity;
        const windSpeed = weatherData.list[i].wind.speed;
        const uvIndex = weatherData.list[i].main.uvi;

        const weatherElement = `
            <h2>${weatherData.city.name}</h2>
            <div class="today">
                <h3>${date.toLocaleDateString()}</h3>
                <img src="assets/images/${icon}@2x.png" alt="weather icon">
                // symbol to be added later
                <p>Temperature: ${temp}°C</p>
                <p>Weather: ${weather}</p>
                <p>Humidity: ${humidity}</p>
                <p>Wind Speed: ${windSpeed}</p>
                <p>UV Index: ${uvIndex}</p>
            </div>`;
        displayElement.innerHTML += weatherElement;
    }
}

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
    const pastCitiesElement = document.getElementById('pastCities'); // Update this ID to match the ID of the element in your HTML file

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
