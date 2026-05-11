import "./styles.css";
import { geocodingAPI, weatherAPI } from "./open-meteo-api.js";
import { processWeatherJSON } from "./process-data.js";

const weatherForLocation = async (cityName) => {
  const location = await geocodingAPI(cityName);
  console.log(location);
  const weather = await weatherAPI(location.latitude, location.longitude);
  const processedData = await processWeatherJSON(weather);
  console.log(processedData);
};

weatherForLocation("Warsaw");
