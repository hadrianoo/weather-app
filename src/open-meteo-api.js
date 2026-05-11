const geocodingAPI = async (cityName) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`,
    );
    if (!response.ok) throw new Error("geocodingAPI", response.status);
    const data = await response.json();
    return {
      latitude: data.results[0].latitude,
      longitude: data.results[0].longitude,
    };
  } catch (error) {
    throw new Error("geocodingAPI", error);
  }
};

const weatherAPI = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,cloud_cover,pressure_msl&timezone=auto`,
    );
    if (!response.ok) throw new Error("weatherAPI", response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error("weatherAPI", error);
  }
};

export { geocodingAPI, weatherAPI };
