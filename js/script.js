//variaveis e seleção
const apiKey = "b3bbcd75ff1d008a2b2b8680da85c399";
const apiCountryUrl = "https://flagsapi.com/";

const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windtyElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

//Funções

const getWeatherData = async(city) => {
    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();

    return data;

}

const showWatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    countryElement.setAttribute("src", apiCountryUrl + data.sys.country + "/flat/64.png");
    humidityElement.innerText = `${data.main.humidity}%`;
    windtyElement.innerText = `${data.wind.speed} km/h`;

    weatherContainer.classList.remove("hide");
};

//Eventos
searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;

    showWatherData(city);

});

cityInput.addEventListener("keyup", (e) => {

    if (e.code == "Enter") {
        const city = e.target.value;

        showWatherData(city);
    }

})