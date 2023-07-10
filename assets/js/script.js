// 5 day weather forecast dashboard

// API constants
const weatherApiKey = "64c0c09d2aaed1a2868153c4c9060aa4";
const weatherApiURL = "https://api.openweathermap.org/data/2.5/forecast";

// DOM constants
const cityInputEl = document.getElementById("cityInput");
const searchBtnEl = document.getElementById("searchBtn");
const pastCitiesEl = document.getElementById("pastCities");
const forecastEl = document.getElementById("forecast");

// Default city
let cityHistory = JSON.parse(localStorage.getItem("cityHistory")) || ["london"];
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

    const currentWeather = weatherData.list[0];
    const date = new Date(currentWeather.dt * 1000);
    const temp = (currentWeather.main.temp - 273.15).toFixed(2);
    const weather = currentWeather.weather[0].description;
    const icon = currentWeather.weather[0].icon; // Weather icon
    const humidity = currentWeather.main.humidity; // %
    const windSpeed = Math.round(currentWeather.wind.speed*2.23694); // m/s to mph
    console.log(windSpeed);
    console.log(currentWeather.wind.speed);
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; // Array of days of the week
    const day = days[date.getDay()]; // Get the day of the week

    const weatherElement = `
        <div class="stats">
            <h2>${weatherData.city.name}</h2>
            <h3>${date.toLocaleTimeString()}</h3>
            <h3>${day}</h3>
            <h3>${date.toLocaleDateString()}</h3>
        </div>
        <div>
            <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" style="height: 20vh">
        </div>
        <div class="stats">
            <p>Temperature: ${temp}°C</p>
            <p>Weather: ${weather}</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} mph</p>
        </div>`;
    displayElement.innerHTML = ''; // Clear the display
    displayElement.innerHTML += weatherElement; // Add the weather element to the display
}

function displayForecast(weatherData) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    for (let i = 4, j = 1; i < weatherData.list.length && j <= 5; j++, i += 8) {
        if (weatherData.list[i]) {
            const dayForecast = weatherData.list[i];
            const date = new Date(dayForecast.dt * 1000);
            const day = days[date.getDay()]; // Get the day of the week
            const temp = (dayForecast.main.temp - 273.15).toFixed(2);
            const weather = dayForecast.weather[0].description;
            const icon = dayForecast.weather[0].icon;
            const humidity = dayForecast.main.humidity;
            const windSpeed = Math.round(dayForecast.wind.speed*2.23694); // m/s to mph

            const forecastElement = document.getElementById(`forecast${j}`);
            forecastElement.innerHTML = '';
            forecastElement.classList.add('card');
            forecastElement.innerHTML = 
            `
                    <h3>${day}, ${date.toLocaleDateString()}</h3>
                    <img src="http://openweathermap.org/img/wn/${icon}.png" alt="weather icon" style="height: 50%">
                    <p>Temperature: ${temp}°C</p>
                    <p>Weather: ${weather}</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Wind Speed: ${windSpeed} mph</p>
            `;
        }
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



function landing() {
    fetchWeather(cityHistory[cityHistory.length - 1]); // Fetch the weather for the last city in the history
}

// Call the function to display the past cities
window.onload = displayPastCities, landing();
