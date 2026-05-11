import "./styles.css";
import { geocodingAPI, weatherAPI } from "./open-meteo-api.js";
import { processWeatherData } from "./process-data.js";

const weatherForLocation = async (cityName) => {
  const location = await geocodingAPI(cityName);
  const weather = await weatherAPI(location.latitude, location.longitude);
  return await processWeatherData(weather);
};

const form = document.querySelector("form");
const input = document.querySelector("input");
const tbody = document.querySelector("tbody");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  try {
    loader(true);
    const data = await weatherForLocation(input.value);
    drawTableBody(data);
  } catch (error) {
    loader(false, "Wrong Input");
    throw new Error("Wrong input", { cause: error });
  }
  loader(false, "Done!");
});

const namesToValues = [
  { name: "Temperature", value: "temperature" },
  { name: "Humidity", value: "humidity" },
  { name: "Pressure", value: "pressure" },
  { name: "Claud Cover", value: "cloudCover" },
  { name: "Wind Speed", value: "windSpeed" },
];

function drawTableBody(data) {
  tbody.innerHTML = "";

  const cityName = document.querySelector("#cityName");
  cityName.textContent = input.value;

  for (const item of namesToValues) {
    const tr = document.createElement("tr");
    const nameCell = document.createElement("th");
    const valueCell = document.createElement("td");
    const unitCell = document.createElement("td");

    nameCell.scope = "row";

    nameCell.textContent = item.name;
    valueCell.textContent = data.values[item.value];
    unitCell.textContent = data.units[item.value];

    tr.appendChild(nameCell);
    tr.appendChild(valueCell);
    tr.appendChild(unitCell);
    tbody.appendChild(tr);
  }
}

function loader(status, message = "") {
  const spinner = document.querySelector(".loader");
  if (status) {
    spinner.classList.add("active");
  } else {
    spinner.classList.remove("active");
    spinner.textContent = message;
  }
}
