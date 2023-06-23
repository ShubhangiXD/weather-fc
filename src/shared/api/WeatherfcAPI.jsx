import { weatherKey, weatherURL } from "../../configuration/WeatherConfig";
import axios from "axios";
export const getWeatherFCDetails = async (cityName) => {
    try {
        const url = weatherURL + `forecast.json?key=${weatherKey}&q=${cityName}&aqi=no&alerts=no`;
        const weatherFCData = await axios.get(url);
        return weatherFCData;
    } catch (error) {
        console.error(error.message)
        return error;
    }
};