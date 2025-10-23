async function getCoordinates(city) {
    const geoURL = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const response = await fetch(geoURL);
    const data = await response.json();
    if (!data.results || data.results.length === 0) {
        throw new Error("City not found");
    }
    const { latitude, longitude, name, country } = data.results[0];
    console.log('city', city)
    return { latitude, longitude, name, country };
}

getCoordinates("London")
    .then(coords => {
        console.log("Coordinates:", coords);
    })
    .catch(error => {
        console.error("Error fetching coordinates:", error);
    });
