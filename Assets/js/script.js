var searchInput = document.getElementById("search-input");
var searchBtn = document.getElementById("search-btn");
var currentDayCard = document.getElementById("current-day");
var forecastData = document.getElementById("Forecast-data");
var searchHistory = document.getElementById("search-history");

// Search button function
var searchHandler = function (cityName) {
    cityName.preventDefault();
    currentDayCard.innerHTML = "";
    forecastData.innerHTML = "";
    var cityName = searchInput.value.trim();
    console.log(cityName);
    if (cityName) {
        getWeatherInfo(cityName);
        cityHistory(cityName);
        searchInput.value = "";
    } else {
        alert("Please enter a City Name!")
    }
};

// Adding city search to history 
var cityHistory = function (city) {
    var historyEl = document.createElement('Button');
    historyEl.setAttribute("class", "city-item btn list-group-item list-group-item-action");
    historyEl.setAttribute("id", city)
    historyEl.textContent = city;
    searchHistory.append(historyEl);

    historyEl.onclick = clickCity;
}

// function to call back clickable cities from the history
var clickCity = function () {
    var cityName = this.id;
    getWeatherInfo(cityName);
}

// fetching the api key to get the data
var getWeatherInfo = function (cityName) {
    var currentURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=42ea263982f3e6fdce056c448e41a364" + "&units=imperial";
    // 5 Day forecast
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=42ea263982f3e6fdce056c448e41a364" + "&units=imperial";

    fetch(currentURL)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    return fetch("https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=42ea263982f3e6fdce056c448e41a364")
                        .then(function (UVresponse) {
                            UVresponse.json().then(function (UVdata) {
                                console.log(UVdata)

                                displayTodayWeather(data, UVdata);
                            })
                        });
                });
            } else {
                alert("Error: " + response.statusText);
            }
        });
    fetch(forecastURL).then(function (response) {
        if (response.ok) {
            response.json().then(function (forecast) {
                console.log(forecast);
                displayForecastWeather(forecast);
            });
        }
    })
};

// Function to display current day weather
var displayTodayWeather = function (data, UVdata) {
    currentDayCard.innerHTML = "";
    currentDayCard.setAttribute("class", "card");
    // Current Day
    var todayCad = document.createElement("div");
    currentDayCard.appendChild(todayCad);
    todayCad.innerHTML = "<h2 class='card-title'>" + data.name + moment().format(" (MM/DD/YY)") + "<img src='https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png'>" + "</h2>";
    // todayCad.setAttribute("class", "card");

    var todayTemp = document.createElement("p");
    todayTemp.textContent = "Temperature: " + data.main.temp + " °F";
    todayTemp.setAttribute("class", "card-text");
    currentDayCard.appendChild(todayTemp);
    var todayHumidity = document.createElement("p");
    todayHumidity.textContent = "Humidity: " + data.main.humidity + "%";
    currentDayCard.appendChild(todayHumidity);
    var todayWindSpeed = document.createElement("p");
    todayWindSpeed.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    currentDayCard.appendChild(todayWindSpeed);

    var todayUVindex = document.createElement("p");
    todayUVindex.textContent = "UV Index:";
    var UVindex = document.createElement("span");
    UVindex.setAttribute("class", "badge badge-danger")
    UVindex.textContent = UVdata.value;
    currentDayCard.appendChild(todayUVindex);
    todayUVindex.appendChild(UVindex);
}

// Function to display 5 day forecasts
var displayForecastWeather = function (forecast) {
    var forecastWeather = document.getElementById("Forecast-data");
    forecastWeather.innerHTML = "";

    var forecastEl = document.createElement("div");
    forecastData.appendChild(forecastEl);

    var forecastTitle = document.createElement("h2")
    forecastTitle.textContent = "5-Day Forecast:";
    forecastEl.appendChild(forecastTitle);

    // Create 5 cards
    for (var i = 0; i < forecast.list.length; i += 8) {
        // if (i <= 4) {
        var cardHolder = document.createElement("div")
        cardHolder.setAttribute("class", "card-deck d-inline-block text-white bg-primary cardInfo")
        // cardHolder.style = "max-width: 10rem;";
        forecastData.appendChild(cardHolder);

        var cardDate = document.createElement("div")
        cardDate.setAttribute("class", "card-header")
        var dateTime = forecast.list[i].dt_txt.split(" ")
        var formatDate = moment(dateTime[0]).format("MM/DD/YY")
        cardDate.textContent = formatDate;
        cardHolder.appendChild(cardDate)

        var cardBody = document.createElement("div")
        cardBody.setAttribute("class", "card-body")
        cardDate.appendChild(cardBody)

        var weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + forecast.list[i].weather[0].icon + "@2x.png");
        cardBody.appendChild(weatherIcon);

        var cardTemp = document.createElement("p");
        cardTemp.textContent = "Temp: " + forecast.list[i].main.temp + " °F";
        cardTemp.setAttribute("class", "card-text");
        cardBody.appendChild(cardTemp);

        var cardHumidity = document.createElement("p");
        cardHumidity.textContent = "Humidity: " + forecast.list[i].main.humidity + "%";
        cardHumidity.setAttribute("class", "card-text");
        cardBody.appendChild(cardHumidity);
        // }
    }
}

searchBtn.addEventListener("click", searchHandler);