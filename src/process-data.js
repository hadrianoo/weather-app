const processWeatherJSON = async (data) => {
  try {
    const processedData = {
      time: data.current.time,
      elevation: data.elevation,
      weather: {
        cloudCover: data.current.cloud_cover,
        pressure: data.current.pressure_msl,
        relativeHumidity: data.current.relative_humidity_2m,
        temperature: data.current.temperature_2m,
        windSpeed: data.current.wind_speed_10m,
      },
      units: {
        cloudCover: data.current_units.cloud_cover,
        pressure: data.current_units.pressure_msl,
        humidity: data.current_units.relative_humidity_2m,
        temperature: data.current_units.temperature_2m,
        windSpeed: data.current_units.wind_speed_10m,
      },
    };
    return processedData;
  } catch (error) {
    throw new Error("processWeatherJSON", error);
  }
};

export { processWeatherJSON };
