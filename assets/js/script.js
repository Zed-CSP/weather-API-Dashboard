// 5 day weather forecast dashboard

// API constants
const weatherApiKey = "64c0c09d2aaed1a2868153c4c9060aa4";
const weatherapiURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
const geocoderapiURL = "https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

// DOM constants
const cityListEl = document.getElementById("cityList");
const search = document.getElementById("search");
const searchBtnEl = document.getElementById("searchBtn");
const searchListEl = document.getElementById("searches");

// Global variables

var cityList = [];


// Functions
function getWeather() {
    // use city name to get lat/lon with geocoder api
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + cityList[0] + '&limit=5&appid=64c0c09d2aaed1a2868153c4c9060aa4')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // save data in an object
            const cityLocObj = {
                city: data[0].name,
                lat: data[0].lat,
                lon: data[0].lon
            }
            console.log(cityLocObj);
            //push cityLocObj to cityList
            cityList.push(cityLocObj);
            console.log(cityList);
            // use lat/lon to get 5 day forecast
            fetch('https://api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=64c0c09d2aaed1a2868153c4c9060aa4')
                .then(function (response) {
                    //console.log(response);
                    if (response.ok) {
                        return response.json();
                    }
                    else {
                        alert("Error: " + response.statusText);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    alert("Unable to connect to OpenWeather");
                })
                .then(function (data) {
                    console.log(data);
                    // save data in an object
                    const cityWeatherObj = {
                        city: cityLocObj.city,
                        date: data.list[0].dt_txt,
                        icon: data.list[0].weather[0].icon,
                        temp: data.list[0].main.temp,
                        humidity: data.list[0].main.humidity,
                        wind: data.list[0].wind.speed,
                        uv: data.list[0].main.uvi
                    }
                    console.log(cityWeatherObj);


                    // save data to local storage
                    localStorage.setItem("cityWeatherObj", JSON.stringify(cityWeatherObj));
                    getCityList();
                    // return data
                    return cityWeatherObj;
                });

        });

    // use lat/lon to get 5 day forecast
    // save data in a variable
    // save data to local storage
    // return data
}

function displayWeather(data) {
    // get data from local storage
    localStorage.getItem("cityWeatherObj");
    // display data on page
}

function getCityList() {
    // get city list from local storage
    localStorage.getItem("cityList");
    // display city list in ul element searchListEl
    for (var i = 0; i < cityList.length; i++) {
        var city = cityList[i];
        var li = document.createElement("button");
        li.textContent = city;
        li.setAttribute("data-index", i);
        searchListEl.appendChild(li);
    }



    // return city list

}

function saveCityList() {
    // save city list to local storage
    cityList = JSON.parse(localStorage.getItem("cityList"));
}

function displayCityList() {
    // display city list on page

    // get city list from local storage
    localStorage.getItem("cityList");
    // display city list in ul element searchListEl
    for (let i = 0; i < cityList.length; i++) {
        let city = cityList[i];
        let li = document.createElement("button");
        li.textContent = city;
        li.setAttribute("data-index", i);
        searchListEl.appendChild(li);
    }

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
}

// event listener for clear button:
clearBtnEl.addEventListener("click", function () {
    // clear city list
    // clear local storage
    // display city list
}
