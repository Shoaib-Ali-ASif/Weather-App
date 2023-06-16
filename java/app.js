// Helper function to fetch weather data from the API
async function fetchWeatherData(city, unit) {
  const apiKey = "eccf41dbcc7bcbfa72b4d979e3f4ebb4";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&cnt=3&APPID=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Invalid Country");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
  }
}

// Helper function to update the weather information in the UI
function updateWeatherUI(data) {
  const weatherIcon = document.querySelector("#weather-icon");
  const body = document.querySelector("body");
  const temperature = document.querySelector(".mainTemp");
  const description = document.querySelector(".desc");
  const pressure = document.querySelector("#pressure");
  const humidity = document.querySelector("#humidity");
  const windSpeed = document.querySelector("#wind");

  // Set weather icon
  const iconCode = data.weather[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@4x.png`;
  weatherIcon.src = iconUrl;

  // Set background color based on weather condition
  const isDaytime = iconCode.endsWith("d");
  body.style.backgroundImage = isDaytime
    ? "linear-gradient( 135deg, #FFE985 10%, #FA742B 100%)"
    : "linear-gradient(225deg, hsla(0, 2%, 37%, 1) 0%, hsla(0, 0%, 4%, 1) 100%)";

  // Set weather information
  temperature.textContent = data.main.temp;
  description.textContent = capitalizeFirstLetter(data.weather[0].description);
  pressure.textContent = data.main.pressure + "hpa";
  humidity.textContent = data.main.humidity + "%";
  windSpeed.textContent = data.wind.speed + "m/s";
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event listener for unit change
const degree = document.querySelector(".temp__unit");
degree.addEventListener("click", () => {
  const isCelsius = degree.getAttribute("data-celsius") === "true";
  const unit = isCelsius ? "imperial" : "metric";
  degree.textContent = isCelsius ? "°F" : "°C";
  degree.setAttribute("data-celsius", !isCelsius);
  const city = document.querySelector("input").value;
  fetchWeatherData(city, unit).then(updateWeatherUI);
});

// Event listener for form submission
const cityForm = document.querySelector("form");
cityForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const city = document.querySelector("input").value;
  const unit = degree.getAttribute("data-celsius") === "true" ? "metric" : "imperial";
  fetchWeatherData(city, unit).then(updateWeatherUI);
});

// Function to initialize the weather app
function initializeWeatherApp() {
  const today = new Date();
  const dateLocal = document.querySelector(".date");
  dateLocal.textContent = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  const unit = degree.getAttribute("data-celsius") === "true" ? "metric" : "imperial";
  const city = document.querySelector("input").value;
  fetchWeatherData(city, unit).then(updateWeatherUI);
}

// Initialize the weather app
initializeWeatherApp();
