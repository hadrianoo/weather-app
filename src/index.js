import "./styles.css";
import { geocodingAPI, weatherAPI } from "./open-meteo-api.js";
import { processWeatherData } from "./process-data.js";

const weatherForLocation = async (cityName) => {
  const location = await geocodingAPI(cityName);
  const weather = await weatherAPI(location.latitude, location.longitude);
  return await processWeatherData(weather);
};

// weatherForLocation("Warsaw");
const form = document.querySelector("form");
const input = document.querySelector("input");
const tbody = document.querySelector("tbody");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  loader(true);

  const data = await weatherForLocation(input.value);
  drawTableBody(data);
  loader(false);
});

function drawTableBody(data) {
  tbody.innerHTML = "";

  const cityName = document.querySelector("#cityName");
  cityName.textContent = input.value;
  const names = [
    "Temperature",
    "Humidity",
    "Pressure",
    "Claud Cover",
    "Wind Speed",
  ];
  const namesToValues = {
    Temperature: "temperature",
    Humidity: "humidity",
    Pressure: "pressure",
    "Claud Cover": "cloudCover",
    "Wind Speed": "windSpeed",
  };
  for (const name of names) {
    const tr = document.createElement("tr");
    const nameTable = document.createElement("th");
    const valueTable = document.createElement("td");
    const unitTable = document.createElement("td");

    nameTable.scope = "row";

    nameTable.textContent = name;
    valueTable.textContent = data.values[namesToValues[name]];
    unitTable.textContent = data.units[namesToValues[name]];

    tr.appendChild(nameTable);
    tr.appendChild(valueTable);
    tr.appendChild(unitTable);
    tbody.appendChild(tr);
  }
}

function loader(status) {
  const spinner = document.querySelector(".loader");
  if (status) {
    spinner.classList.add("active");
  } else {
    spinner.classList.remove("active");
  }
}
