//API-KEY : https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&cnt=3&APPID=eccf41dbcc7bcbfa72b4d979e3f4ebb4
//Weather ICON : http://openweathermap.org/img/wn/${iconCode}@4x.png

//Setting variables
const cityForm = document.querySelector("form");
const cityInput = document.querySelector("input");
const temp = document.querySelector(".mainTemp");
const desc = document.querySelector(".desc");
const pressure = document.querySelector("#pressure"); //hpa
const humidity = document.querySelector("#humidity"); //%
const windw = document.querySelector("#wind"); //m/s
const form = document.querySelector("form");
const degree = document.querySelector(".temp__unit");
const dateLocal = document.querySelector(".date");
const body = document.querySelector("body");

//Unit Change Function
async function changeUnits() {
  if (degree.getAttribute("data-celsius") !== "true") {
    degree.textContent = "°C";
    degree.setAttribute("data-celsius", "true");
    unit = "metric";
    await weatherData(cityInput.value, unit);
  } else {
    degree.textContent = "°F";
    degree.setAttribute("data-celsius", "false");
    unit = "imperial";
    await weatherData(cityInput.value, unit);
  }
}

//Setting Units & City
let unit = "imperial";
cityForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const result = cityInput.value;
  weatherData(result, unit);
  cityInput.blur();
});

//Getting & Setting Weather Data
async function weatherData(city, unit) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&cnt=3&APPID=eccf41dbcc7bcbfa72b4d979e3f4ebb4`
  );
  if (!response.ok) alert("Invalid Country");
  else {
    let data = await response.json();

    //setting up weather ICON:
    const weatherIcon = document.querySelector("#weather-icon");
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    //Setting Weather
    switch (data.weather[0].icon) {
      //Backgrounds for Day
      case "01d":
        body.style.backgroundImage =
          "linear-gradient( 135deg, #FFE985 10%, #FA742B 100%)";
        setColor("white");
        break;
      case "02d":
        body.style.backgroundImage =
          " radial-gradient( circle 400px at 6.8% 8.3%,  rgba(255,244,169,1) 0%, rgba(255,244,234,1) 100.2% )";
        setColor("black");
        break;
      case "03d":
        body.style.backgroundImage =
          "linear-gradient(45deg, hsla(0, 0%, 100%, 1) 0%, hsla(0, 0%, 75%, 1) 100%)";
        setColor("black");
        break;
      case "04d":
        body.style.backgroundImage =
          "linear-gradient(180deg, hsla(0, 3%, 87%, 1) 0%, hsla(0, 1%, 20%, 1) 100%)";
        setColor("black");
        break;
      case "09d":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 3%, 87%, 1) 0%, hsla(0, 1%, 20%, 1) 100%)";
        setColor("black");
        break;
      case "10d":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 3%, 87%, 1) 0%, hsla(26, 100%, 85%, 1) 100%)";
        setColor("black");
        break;
      case "11d":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 18%, 64%, 1) 0%, hsla(0, 0%, 0%, 1) 100%)";
        setColor("black");
        break;
      case "13d":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 0%, 87%, 1) 5%, hsla(0, 0%, 100%, 1) 100%)";
        setColor("black");
        break;
      case "50d":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 0%, 96%, 1) 0%, hsla(0, 0%, 100%, 1) 100%)";
        setColor("black");
        break;
      //Backgrounds for Night
      case "01n":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 2%, 37%, 1) 0%, hsla(0, 0%, 4%, 1) 100%)";
        setColor("black");
        break;
      case "02n":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 1%, 59%, 1) 0%, hsla(0, 0%, 14%, 1) 100%)";
        setColor("black");
        break;
      case "03n":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 0%, 88%, 1) 0%, hsla(0, 0%, 14%, 1) 100%);";
        setColor("black");
        break;
      case "04n":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 0%, 17%, 1) 0%, hsla(0, 0%, 14%, 1) 100%)";
        setColor("black");
        break;
      case "09n":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 0%, 0%, 1) 0%, hsla(0, 0%, 54%, 1) 100%)";
        setColor("black");
        break;
      case "10n":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 0%, 0%, 1) 0%, hsla(0, 0%, 27%, 1) 100%)";
        setColor("black");
        break;
      case "11n":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 18%, 64%, 1) 0%, hsla(0, 0%, 0%, 1) 100%)";
        setColor("white");
        break;
      case "13n":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 0%, 0%, 1) 0%, hsla(0, 2%, 36%, 1) 100%)";
        setColor("white");
        break;
      case "50n":
        body.style.backgroundImage =
          "linear-gradient(225deg, hsla(0, 2%, 36%, 1) 0%, hsla(0, 0%, 0%, 1) 100%)";
        setColor("black");
        break;
    }
    //Setting ICONS:
    pressure.textContent = data.main.pressure + "hpa";
    humidity.textContent = data.main.humidity + "%";
    windw.textContent = data.wind.speed + "m/s";
    //Setting Temp Description:
    temp.textContent = data.main.temp;
    desc.textContent = transformDesc(data.weather[0].description);
  }
}
//Function to Make First letter Capital
function transformDesc(data) {
  const correctArr = data
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1));
  return correctArr.join(" ");
}
//DATE
function dateUpdated() {
  let date = new Date();
  let today = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  dateLocal.innerHTML = `
${today}<span>/</span>${month}<span>/</span>${year}
`;
}
//Getting Hours
let hours = new Date().getHours();

// Running Function
changeUnits();
dateUpdated();

function setColor(clr) {
  const CountryName = (document.querySelector("#countryName").style.color =
    clr);
  const mainTemp = (document.querySelector(".mainTemp").style.color = clr);
  const temp__unit = (document.querySelector(".temp__unit").style.color = clr);
  const desc = (document.querySelector(".desc").style.color = clr);
  const details__num = document.querySelectorAll(".details__num");
  details__num.forEach((color) => {
    color.style.color = clr;
  });
}
