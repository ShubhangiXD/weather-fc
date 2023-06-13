import { weatherKey, weatherURL } from "../../configuration/WeatherConfig";
import axios from "axios";
export const getWeatherDetails = async (cityName) => {
    try {
        const url = weatherURL + `current.json?key=${weatherKey}&q=${cityName}&aqi=no`;
        const weatherData = await axios.get(url);
        return weatherData;
    } catch (error) {
        console.error(error.message)
        return error;
    }
};