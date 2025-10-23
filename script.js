async function getCoordinates(city) {
  const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;
  const response = await fetch(geoURL);
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  } else if (city === "") {
    throw new Error("Please enter a city name");
  }

  const { latitude, longitude, name, country } = data.results[0];
  return { latitude, longitude, name, country };
}

async function getWeather(latitute, longtitude) {
  const weatherURL = `https://api.open-meteo.com/v1/forecast?latitude=${latitute}&longitude=${longtitude}&current_weather=true`;
  const response = await fetch(weatherURL);
  const data = await response.json();
  return data.current_weather;
}

document.getElementById("getWeatherBtn").addEventListener("click", async () => {
  const city = document.getElementById("cityInput").value;
  const weatherResultDiv = document.getElementById("weatherResult");
  weatherResultDiv.innerHTML = "Loading...";

  try {
    const { latitude, longitude, name, country } = await getCoordinates(city);
    const weather = await getWeather(latitude, longitude);
    const date = new Date(weather.time);
    weatherResultDiv.innerHTML = `
            <h2>Weather in ${name}, ${country}</h2>
            <p>Temperature: ${weather.temperature}°C</p>
            <p>Wind Speed: ${weather.windspeed} km/h</p>
            <p>Wind Direction: ${weather.winddirection}°</p>
            <p>Time: ${date.toLocaleString("en-GB", {
              dateStyle: "medium",
              timeStyle: "short",
            })}</p>
        `;
  } catch (error) {
    weatherResultDiv.innerHTML = `Error: ${error.message}`;
  }
});
