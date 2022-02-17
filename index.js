/////////////////////////////////////////////////////////

//Current day and time on load

/////////////////////////////////////////////////////////

function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

/////////////////////////////////////////////////////////

//Current weather in person's location on load

/////////////////////////////////////////////////////////

function searchLocation(position) {
  let apiKey = "d3592968d288237ab5de304e493c66f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayCurrentOnPage);
}

function getCurrentLocation() {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayCurrentOnPage(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  //document.querySelector("#icon").innerHTML = response.data.main
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
}

/////////////////////////////////////////////////////////

//Weather for city being searched

/////////////////////////////////////////////////////////

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  getWeather(cityInput.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function getWeather(city) {
  let apiKey = "d3592968d288237ab5de304e493c66f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
  axios.get(`${apiUrl}&q=${city}&appid=${apiKey}`).then(displayOnPage);
}

navigator.geolocation.getCurrentPosition(getWeather);

function displayOnPage(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  //document.querySelector("#icon").innerHTML = response.data.main
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;

  function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
    getWeather(cityInput.value);
  }
  ///added in later to get coordinates for forecast:
  getForecast(response.data.coord);
}

/////////////////////////////////////////////////////////

//Celsius and farenheit temperatuere displays

/////////////////////////////////////////////////////////

let celsiusTemperature = null;
//let farenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", showFarenheit);

function showFarenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
}

function showCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");

  tempElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
}

/////////////////////////////////////////////////////////

//Duplicating forecast day

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tues"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <div class="forecast-date">${day}</div>
          
          <div class="forecast-icon">
            <img
              src="https://openweathermap.org/img/wn/03d@2x.png"
              id="weatherIcon"
              width="36"
            />
          </div>
          <div class="forecast-temp">
            <span id="high-temp">18</span>
            <span>° </span>
            <span id="low-temp">12</span>
            <span>°</span>
          </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Move inside getForecast
//displayForecast();

/////////////////////////////////////////////////////////

//API call for forecast

function getForecast(coordinates) {
  let apiKey = "d3592968d288237ab5de304e493c66f3";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}
