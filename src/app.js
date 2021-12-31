// showing current day of the week 
let dayElement = document.querySelector("#day");
let currentDay = new Date();
let day = currentDay.getDay(); 
let days = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];
dayElement.innerHTML = `${days[day]}`;
// showing current time + added 0 in front of minutes
let timeElement = document.querySelector("#time");
let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
timeElement.innerHTML = `${hours}:${minutes}`;


// funtion for finding georgaphical coordinates of a city that is being searched. Needed for the forecats API
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "4e13aa90127904d13b6a4af59475dbf3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
}
// displaying a name of the city after a user submts the form
// funtion for the weather condition that we mention in the function below
function displayWeatherCondition(response)
{
  console.log(response.data.name);
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#currenttemprature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#feelstemprature").innerHTML = Math.round(response.data.main.feels_like);
  document.querySelector("#currentweather").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#mintemp").innerHTML =  Math.round(response.data.main.temp_min);
  document.querySelector("#maxtemp").innerHTML =  Math.round(response.data.main.temp_max);

  let sunriseElement = document.querySelector("#sunrise");
  let sunriseTime = new Date(response.data.sys.sunrise * 1000);
  let sunrisehours = sunriseTime.getHours();
  let sunriseminutes = sunriseTime.getMinutes();
    if (sunriseminutes < 10) {
    sunriseminutes = `0${sunriseminutes}`;
  }
  sunriseElement.innerHTML = `${sunrisehours}:${sunriseminutes}`;

  let sunsetElement = document.querySelector("#sunset");
  let sunsetTime = new Date(response.data.sys.sunset * 1000);
  let sunsethours = sunsetTime.getHours();
  let sunsetminutes = sunsetTime.getMinutes();
    if (sunsetminutes < 10) {
    sunsetminutes = `0${sunsetminutes}`
  }
  sunsetElement.innerHTML = `${sunsethours}:${sunsetminutes}`;

celciusTemperature = response.data.main.temp;
celciusfeelslikeTemperature = Math.round(response.data.main.feels_like);
celciusminTemperature = Math.round(response.data.main.temp_min);
celciusmaxTemperature = Math.round(response.data.main.temp_max);
  
let iconElement = document.querySelector("#bigicon");
iconElement.setAttribute("class", `wi wi-owm-${response.data.weather[0].id} bigicon`);

getForecast(response.data.coord);

}

// forecast
function displayForecast(response){
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#nextdays");

  let forecastHTML = `<div class="row row-cols-5">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  days.forEach(function(day){
    forecastHTML = forecastHTML + `
                <div class="col">
                    <div class="card smallweathercard" style="width: 100px;">
                        <div class="card-body">
                            <div class="smallday">
                                ${day}
                            </div>
                             <div class="smallweather">
                                SUNNY
                            </div>
                            <span class="smallicon">
                            <i class="fas fa-sun"></i></span>
                            <div class="smalltemp">
                                <span class="warmest"> 20°C </span> <span class="coldest"> 15°C </span> 
                            </div>
                        </div>
                    </div>
                </div>
            `;
  })
 
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;

}


// function for the onload search for Berlin
function searchCity(city) {
  let apiKey = "4e13aa90127904d13b6a4af59475dbf3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  // let cityElement = document.querySelector("#city");
  // let cityInput = document.querySelector("#city-input");
  // cityElement.innerHTML = cityInput.value;
  // make an API call to OpenWeather API
  // once I get the HTTP response, the city name and the temperature are displayed
  let city = document.querySelector("#city-input").value;
  // moving all below to the fuction above to have the onload search for Berlin
  // let apiKey = "4e13aa90127904d13b6a4af59475dbf3";
  // let apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  // axios.get(apiUrl).then(displayWeatherCondition);
  // calling for the search city function so search for other cities will work 
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);
// API for current location
function searchLocation(position) {
  let apiKey = "4e13aa90127904d13b6a4af59475dbf3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
// funtion for button current submit 
function getCurrentLocation (event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
// changing C to F on a clik (with fake data)
function convertToFahrenheit(event)
{
  event.preventDefault();
  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
    if (temperatureSymbolElement.innerHTML !== "°F"){
    let temperatureElement = document.querySelector("#currenttemprature");
    let currenttemprature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);}
  // feels like
  let temperaturefeelslikeElement = document.querySelector("#feelstemprature");
  if (temperatureSymbolElement.innerHTML !== "°F") {
  let feelstemprature = temperaturefeelslikeElement.innerHTML;
  temperaturefeelslikeElement.innerHTML = Math.round((celciusfeelslikeTemperature * 9) / 5 + 32);}
  // min temp 
  let temperatureminElement = document.querySelector("#mintemp");
  if (temperatureSymbolElement.innerHTML !== "°F") {
    let temperaturemin = temperatureminElement.innerHTML;
    temperatureminElement.innerHTML = Math.round((celciusminTemperature * 9) / 5 + 32);
  }
  // max temp 
  let temperaturemaxElement = document.querySelector("#maxtemp");
  if (temperatureSymbolElement.innerHTML !== "°F") {
    let temperaturemax = temperaturemaxElement.innerHTML;
    temperaturemaxElement.innerHTML = Math.round((celciusmaxTemperature * 9) / 5 + 32);
  }
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

// C - F
function convertToFahrenheitSymbol(event)
{
  event.preventDefault();
  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
  let temperaturesymbol = temperatureSymbolElement.innerHTML;
  temperatureSymbolElement.innerHTML = "°F";
  // feels like
  let temperaturefeelslikeSymbolElement = document.querySelector("#feelstempraturesymbol");
  let feelstempraturesymbol = temperaturefeelslikeSymbolElement.innerHTML;
  temperaturefeelslikeSymbolElement.innerHTML = "°F";
  // min temp
  let temperatureminSymbolElement = document.querySelector("#temperatureminsymbol");
  let temperatureminsymbol = temperatureminSymbolElement.innerHTML;
  temperatureminSymbolElement.innerHTML = "°F";
  // max temp 
  let temperaturemaxSymbolElement = document.querySelector("#temperaturemaxsymbol");
  let temperaturemaxsymbol = temperaturemaxSymbolElement.innerHTML;
  temperaturemaxSymbolElement.innerHTML = "°F";
}
let fahrenheitsymbol = document.querySelector("#fahrenheit");
fahrenheitsymbol.addEventListener("click", convertToFahrenheitSymbol);

// changing F to C on a clik 
function convertToCelcius(event)
{
  event.preventDefault();
  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
    if (temperatureSymbolElement.innerHTML !== "°C") {
  let temperatureElement = document.querySelector("#currenttemprature");
  let currenttemprature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(celciusTemperature);}
  // feels like 
  let temperaturefeelslikeElement = document.querySelector("#feelstemprature");
    if (temperatureSymbolElement.innerHTML !== "°C") {
  let feelstemprature = temperaturefeelslikeElement.innerHTML;
  temperaturefeelslikeElement.innerHTML = celciusfeelslikeTemperature;}
  // min temp 
  let temperatureminElement = document.querySelector("#mintemp");
  if (temperatureSymbolElement.innerHTML !== "°C") {
    let temperaturemin = temperatureminElement.innerHTML;
    temperatureminElement.innerHTML = celciusminTemperature;
  }
  // max temp 
  let temperaturemaxElement = document.querySelector("#maxtemp");
  if (temperatureSymbolElement.innerHTML !== "°C") {
    let temperaturemax = temperaturemaxElement.innerHTML;
    temperaturemaxElement.innerHTML = celciusmaxTemperature;
  }
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelcius);

// F - C
function convertToCelciusSymbol(event)
{
  event.preventDefault();
  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
  let temperaturesymbol = temperatureSymbolElement.innerHTML;
  temperatureSymbolElement.innerHTML = "°C";
  // feels like
  let temperaturefeelslikeSymbolElement = document.querySelector("#feelstempraturesymbol");
  let feelstempraturesymbol = temperaturefeelslikeSymbolElement.innerHTML;
  temperaturefeelslikeSymbolElement.innerHTML = "°C";
  // min temp 
  let temperatureminSymbolElement = document.querySelector("#temperatureminsymbol");
  let temperatureminsymbol = temperatureminSymbolElement.innerHTML;
  temperatureminSymbolElement.innerHTML = "°C";
  //
  let temperaturemaxSymbolElement = document.querySelector("#temperaturemaxsymbol");
  let temperaturemaxsymbol = temperaturemaxSymbolElement.innerHTML;
  temperaturemaxSymbolElement.innerHTML = "°C";
}
let celciussymbol = document.querySelector("#celcius");
celciussymbol.addEventListener("click", convertToCelciusSymbol);

// adding current location button 
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// making the button change the tempatyre only once when clicked 
let celciusTemperature = null; 
let celciusfeelslikeTemperature = null ;
let fahrenheitTemperature = null;

// calling a city on load 
searchCity("Berlin");
