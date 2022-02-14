//to time this using the API time stamp for the city selected,
//see Week 7 Lesson 6 minute 7

//format of description in css:
//#description::first-letter {
//  text-transform: uppercase;}

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

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  getWeather(cityInput.value);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

////////////////

function getWeather(city) {
  let apiKey = "d3592968d288237ab5de304e493c66f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
  axios.get(`${apiUrl}&q=${city}&appid=${apiKey}`).then(displayOnPage);
}

navigator.geolocation.getCurrentPosition(getWeather);

function displayOnPage(response) {
  //console.log(response.data.main.temp);
  //console.log(response.data.main.humidity);
  //console.log(response.data.wind.speed);
  //console.log(response.data.weather[0].main);
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

  function search(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city");
    let cityInput = document.querySelector("#city-input");
    cityElement.innerHTML = cityInput.value;
    getWeather(cityInput.value);
  }
}

//////////////////////

function searchLocation(position) {
  let apiKey = "d3592968d288237ab5de304e493c66f3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayOnPage);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function searchGeo(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;
}
