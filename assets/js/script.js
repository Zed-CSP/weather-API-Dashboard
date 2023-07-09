// 5 day weather forecast dashboard

// API constants
const weatherApiKey = "64c0c09d2aaed1a2868153c4c9060aa4";
const weatherApiURL = "https://api.openweathermap.org/data/2.5/forecast";

// DOM constants
const cityInputEl = document.getElementById("cityInput");
const searchBtnEl = document.getElementById("searchBtn");
const pastCitiesEl = document.getElementById("pastCities");
const forecastEl = document.getElementById("forecast");

// Event listeners

searchBtnEl.addEventListener("click", function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        fetchWeather(city);
        saveCityToHistory(city);
        cityInputEl.value = "";
    }
});

// Functions 

async function fetchWeather(city) {
    try {
        const response = await fetch(`${weatherApiURL}?q=${city}&appid=${weatherApiKey}`);
        if (!response.ok) throw new Error('Failed to fetch weather data');
        
        const weatherData = await response.json();
        displayCurrentWeather(weatherData);
        displayForecast(weatherData);
    } catch (error) {
        console.error(error);
    }
}

function displayCurrentWeather(weatherData) {
    const displayElement = document.getElementById('weatherDisplay');
    displayElement.innerHTML = '';

    const currentWeather = weatherData.list[0];
    const date = new Date(currentWeather.dt * 1000);
    const temp = (currentWeather.main.temp - 273.15).toFixed(2);
    const weather = currentWeather.weather[0].description;
    const icon = currentWeather.weather[0].icon;
    const humidity = currentWeather.main.humidity;
    const windSpeed = currentWeather.wind.speed;

    const weatherElement = `
        <h2>${weatherData.city.name}</h2>
        <div class="today">
            <h3>${date.toLocaleDateString()}</h3>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
            <p>Temperature: ${temp}°C</p>
            <p>Weather: ${weather}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>
        </div>`;
    displayElement.innerHTML += weatherElement;
}

function displayForecast(weatherData) {
    forecastEl.innerHTML = '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = 8; i < weatherData.list.length; i += 8) {
        const dayForecast = weatherData.list[i];
        const date = new Date(dayForecast.dt * 1000);
        const day = days[date.getDay()]; // Get the day of the week
        const temp = (dayForecast.main.temp - 273.15).toFixed(2);
        const weather = dayForecast.weather[0].description;
        const icon = dayForecast.weather[0].icon;
        const humidity = dayForecast.main.humidity;
        const windSpeed = dayForecast.wind.speed;

        const forecastElement = document.createElement('div');
        forecastElement.classList.add('forecast-card');
        forecastElement.innerHTML = `
            <h3>${day}, ${date.toLocaleDateString()}</h3>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon">
            <p>Temperature: ${temp}°C</p>
            <p>Weather: ${weather}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} m/s</p>`;
        forecastEl.appendChild(forecastElement);
    }
}

function saveCityToHistory(city) {
    let cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
    if (!cityHistory.includes(city)) {
        cityHistory.push(city);
        localStorage.setItem("cityHistory", JSON.stringify(cityHistory));
    }
    displayPastCities();
}

function displayPastCities() {
    const cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || [];
    pastCitiesEl.innerHTML = '';

    cityHistory.forEach(city => {
        const cityElement = document.createElement('button');
        cityElement.textContent = city;
        cityElement.addEventListener('click', () => {
            cityInputEl.value = city;
            fetchWeather(city);
        });

        pastCitiesEl.appendChild(cityElement);
    });
}

// Call the function to display the past cities
window.onload = displayPastCities;
