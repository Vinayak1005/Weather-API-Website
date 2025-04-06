const apiKey = "e297ba97206e0c16d65ef6a94d361f62";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        console.log(data); // Debugging: Check the API response

        // **Handle errors (e.g., city not found)**
        if (data.cod !== 200) {
            alert("City not found! Please enter a valid city name.");
            return;
        }

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"; // Fixed "&" to "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        // **Check if `data.weather` exists before accessing it**
        if (!data.weather || data.weather.length === 0) {
            alert("Weather data not available.");
            return;
        }

        const weatherCondition = data.weather[0].main;

        if (weatherCondition === "Clouds") {
            weatherIcon.src = "./Assets/clouds.png";
        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "./Assets/clear.png";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "./Assets/rain.png";
        } else if (weatherCondition === "Drizzle") { // Fixed "Drizzel" typo
            weatherIcon.src = "./Assets/drizzle.png";
        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "./Assets/mist.png";
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please try again later.");
    }

    document.querySelector(".weather").style.display ="block";
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});



















