
$(document).ready(function () {

$("#weather-btn").on("click", function(event) {
    event.preventDefault();

    var cityInput = $("#weather-input").val().trim();
    console.log(cityInput);
    currentWeather(cityInput )
    forcast(cityInput);
    localStorage.setItem("weather", json.stringify(citties));
});

function currentWeather(city){

    $.ajax({
        method:"GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=d84daf4ca84d96a04652f35d46329bd2&units=imperial"
     
    }).then(function(weather){
        console.log(weather);

        var cityName = document.querySelector(".city");
        cityName.textContent = weather.name + " (" + moment().format("l") + ")";

        var Fur = weather.main.temp.toFixed(1);
        console.log(Fur);
        var tempToday = document.querySelector(".temp");
        tempToday.textContent = "Temperature:" + Fur + "Fur";

        var humidity = weather.main.humidity;
        console.log(humidity);
        var humidityToday = document.querySelector(".humidity");
        humidityToday.textContent = "Humidity:" + humidity + "%";

        console.log(weather.wind);
        var windSpeed = weather.wind.speed.toFixed();
        var windDeg = weather.wind.deg;
        var windCurrent = document.querySelector(".wind");
        windCurrent.textContent = "wind speed: " + windSpeed + "MPH";

        var uvlat = weather.coord.lat;
        console.log(uvlat);
        var uvlon = weather.coord.lon;
        console.log(uvlon);



        var






      })








}


















});
