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

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day]; 
}

// forecast
function displayForecast(response)
{
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#nextdays");
  let forecastHTML = `<div class="row row-cols-5">`;
  // it was used for fake data, now we are replacing it with the variable forecast 
  // let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  // days.forEach(function(day){
    forecast.forEach(function(forecastDay, index){
      if (index <=5 && index > 0) {
        forecastHTML = forecastHTML + `
                <div class="col">
                    <div class="card smallweathercard" style="width: 100px;">
                        <div class="card-body">
                            <div class="smallday">
                                ${formatDay(forecastDay.dt)}
                            </div>
                             <div class="smallweather">
                                ${forecastDay.weather[0].main}
                            </div>
                            <span>
                            <i class="wi wi-owm-${forecastDay.weather[0].id} smallicon" id="smallicon"></i></span>
                            <div class="smalltemp">
                                <span class="coldest" id="forecastmin`+index+`"> ${Math.round(forecastDay.temp.min)}</span><span class="coldest" id="forecastminsymbol`+index+`">°C</span>
                                <span class="warmest" id="forecastmax`+index+`"> ${Math.round(forecastDay.temp.max)}</span><span class="warmest" id="forecastmaxsymbol`+index+`">°C</span> 
                            </div>
                        </div>
                    </div>
                </div>
        `;

      }
  })

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  forecast1MaxTemperature = Math.round(forecast[1].temp.max);
  forecast2MaxTemperature = Math.round(forecast[2].temp.max);
  forecast3MaxTemperature = Math.round(forecast[3].temp.max);
  forecast4MaxTemperature = Math.round(forecast[4].temp.max);
  forecast5MaxTemperature = Math.round(forecast[5].temp.max);
  forecast1MinTemperature = Math.round(forecast[1].temp.min);
  forecast2MinTemperature = Math.round(forecast[2].temp.min);
  forecast3MinTemperature = Math.round(forecast[3].temp.min);
  forecast4MinTemperature = Math.round(forecast[4].temp.min);
  forecast5MinTemperature = Math.round(forecast[5].temp.min);
 
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
// changing C to F on a clik 
function convertToFahrenheit(event)
{
  event.preventDefault();
  /*let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
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
  // forecast
  let temperatureforecasatElement = document.querySelector("#id=forecastmax1"); //<--
  if (temperatureSymbolElement.innerHTML !== "°F") {
    let temperatureforecastmax = temperatureforecasatElement.innerHTML;
    temperatureforecasatElement.innerHTML = Math.round((forecastclecius * 9) / 5 + 32); 
  }*/




  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
  if (temperatureSymbolElement.innerHTML !== "°F"){
    let temperatureElement = document.querySelector("#currenttemprature");
    temperatureElement.innerHTML = Math.round((celciusTemperature * 9) / 5 + 32);

    let temperaturefeelslikeElement = document.querySelector("#feelstemprature");
    temperaturefeelslikeElement.innerHTML = Math.round((celciusfeelslikeTemperature * 9) / 5 + 32);

    let temperatureminElement = document.querySelector("#mintemp");
    temperatureminElement.innerHTML = Math.round((celciusminTemperature * 9) / 5 + 32);

    let temperaturemaxElement = document.querySelector("#maxtemp");
    temperaturemaxElement.innerHTML = Math.round((celciusmaxTemperature * 9) / 5 + 32);

    let temperatureforecastElement = document.querySelector("#forecastmax1");
    temperatureforecastElement.innerHTML = Math.round((forecast1MaxTemperature * 9) / 5 + 32); 

    let temperatureforecast2Element = document.querySelector("#forecastmax2");
    temperatureforecast2Element.innerHTML = Math.round((forecast2MaxTemperature * 9) / 5 + 32); 

     let temperatureforecast3Element = document.querySelector("#forecastmax3");
    temperatureforecast3Element.innerHTML = Math.round((forecast3MaxTemperature * 9) / 5 + 32); 

     let temperatureforecast4Element = document.querySelector("#forecastmax4");
    temperatureforecast4Element.innerHTML = Math.round((forecast4MaxTemperature * 9) / 5 + 32); 

     let temperatureforecast5Element = document.querySelector("#forecastmax5");
    temperatureforecast5Element.innerHTML = Math.round((forecast5MaxTemperature * 9) / 5 + 32); 

    let temperatureforecastmin1Element = document.querySelector("#forecastmin1");
    temperatureforecastmin1Element.innerHTML = Math.round((forecast1MinTemperature * 9) / 5 + 32); 

    let temperatureforecastmin2Element = document.querySelector("#forecastmin2");
    temperatureforecastmin2Element.innerHTML = Math.round((forecast2MinTemperature * 9) / 5 + 32); 

    let temperatureforecastmin3Element = document.querySelector("#forecastmin3");
    temperatureforecastmin3Element.innerHTML = Math.round((forecast3MinTemperature * 9) / 5 + 32); 

    let temperatureforecastmin4Element = document.querySelector("#forecastmin4");
    temperatureforecastmin4Element.innerHTML = Math.round((forecast4MinTemperature * 9) / 5 + 32); 

    let temperatureforecastmin5Element = document.querySelector("#forecastmin5");
    temperatureforecastmin5Element.innerHTML = Math.round((forecast5MinTemperature * 9) / 5 + 32); 
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
  // forecast1 temp 
  let temperatureforecastElement = document.querySelector("#forecastmaxsymbol1");
  temperatureforecastElement.innerHTML = "°F";

  let temperatureforecast2Element = document.querySelector("#forecastmaxsymbol2");
  temperatureforecast2Element.innerHTML = "°F";

  let temperatureforecast3Element = document.querySelector("#forecastmaxsymbol3");
  temperatureforecast3Element.innerHTML = "°F";

  let temperatureforecast4Element = document.querySelector("#forecastmaxsymbol4");
  temperatureforecast4Element.innerHTML = "°F";

  let temperatureforecast5Element = document.querySelector("#forecastmaxsymbol5");
  temperatureforecast5Element.innerHTML = "°F";

  let temperatureforecastmin1Element = document.querySelector("#forecastminsymbol1");
  temperatureforecastmin1Element .innerHTML = "°F";

   let temperatureforecastmin2Element = document.querySelector("#forecastminsymbol2");
  temperatureforecastmin2Element .innerHTML = "°F";

   let temperatureforecastmin3Element = document.querySelector("#forecastminsymbol3");
  temperatureforecastmin3Element .innerHTML = "°F";

   let temperatureforecastmin4Element = document.querySelector("#forecastminsymbol4");
  temperatureforecastmin4Element .innerHTML = "°F";

   let temperatureforecastmin5Element = document.querySelector("#forecastminsymbol5");
  temperatureforecastmin5Element .innerHTML = "°F";


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
    temperatureElement.innerHTML = Math.round(celciusTemperature);}
  // feels like 
    let temperaturefeelslikeElement = document.querySelector("#feelstemprature");
    temperaturefeelslikeElement.innerHTML = celciusfeelslikeTemperature;
  // min temp 
    let temperatureminElement = document.querySelector("#mintemp");
    temperatureminElement.innerHTML = celciusminTemperature;
  // max temp 
    let temperaturemaxElement = document.querySelector("#maxtemp");
    temperaturemaxElement.innerHTML = celciusmaxTemperature;
  // forecast1
    let temperatureforecastElement = document.querySelector("#forecastmax1");
    temperatureforecastElement.innerHTML = forecast1MaxTemperature;

    let temperatureforecast2Element = document.querySelector("#forecastmax2");
    temperatureforecast2Element.innerHTML = forecast2MaxTemperature;

    let temperatureforecast3Element = document.querySelector("#forecastmax3");
    temperatureforecast3Element.innerHTML = forecast3MaxTemperature;

    let temperatureforecast4Element = document.querySelector("#forecastmax4");
    temperatureforecast4Element.innerHTML = forecast4MaxTemperature;

    let temperatureforecast5Element = document.querySelector("#forecastmax5");
    temperatureforecast5Element.innerHTML = forecast5MaxTemperature;

    let temperatureforecastmin1Element = document.querySelector("#forecastmin1");
    temperatureforecastmin1Element.innerHTML = forecast1MinTemperature;

    let temperatureforecastmin2Element = document.querySelector("#forecastmin2");
    temperatureforecastmin2Element.innerHTML = forecast2MinTemperature;

    let temperatureforecastmin3Element = document.querySelector("#forecastmin3");
    temperatureforecastmin3Element.innerHTML = forecast3MinTemperature;
    
    let temperatureforecastmin4Element = document.querySelector("#forecastmin4");
    temperatureforecastmin4Element.innerHTML = forecast4MinTemperature;

    let temperatureforecastmin5Element = document.querySelector("#forecastmin5");
    temperatureforecastmin5Element.innerHTML = forecast5MinTemperature;
  
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelcius);

// F - C
function convertToCelciusSymbol(event)
{
  event.preventDefault();
  let temperatureSymbolElement = document.querySelector("#temperaturesymbol");
  temperatureSymbolElement.innerHTML = "°C";
  // feels like
  let temperaturefeelslikeSymbolElement = document.querySelector("#feelstempraturesymbol");
  temperaturefeelslikeSymbolElement.innerHTML = "°C";
  // min temp 
  let temperatureminSymbolElement = document.querySelector("#temperatureminsymbol");
  temperatureminSymbolElement.innerHTML = "°C";
  //
  let temperaturemaxSymbolElement = document.querySelector("#temperaturemaxsymbol");
  temperaturemaxSymbolElement.innerHTML = "°C";
  // forecast1
for (let i = 1; i <=5; i++){
  let temperatureForecastMaxElement = document.querySelector("#forecastmaxsymbol" + i);
  let temperatureForecastMinElement = document.querySelector("#forecastminsymbol" + i);

  temperatureForecastMaxElement.innerHTML = "°C";
  temperatureForecastMinElement.innerHTML = "°C";
}
 
}
let celciussymbol = document.querySelector("#celcius");
celciussymbol.addEventListener("click", convertToCelciusSymbol);

// adding current location button 
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

// making the button change the tempatyre only once when clicked 
let celciusTemperature = null; 
let celciusfeelslikeTemperature = null;
let fahrenheitTemperature = null;
let forecast1MaxTemperature = null;
let forecast2MaxTemperature = null;
let forecast3MaxTemperature = null;
let forecast4MaxTemperature = null;
let forecast5MaxTemperature = null;
let forecast1MinTemperature = null;
let forecast2MinTemperature = null;
let forecast3MinTemperature = null;
let forecast4MinTemperature = null;
let forecast5MinTemperature = null;

// calling a city on load 
searchCity("Berlin");
