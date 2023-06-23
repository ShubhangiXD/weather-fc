import React, { useState, useEffect } from 'react'
import moment from 'moment/moment';
import Input from '../../shared/Input';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../../shared/ErrorMessage';
import { Credits } from '../../shared/Credits';
import { Header } from '../../shared/Header';
import { getWeatherFCDetails } from '../../shared/api/WeatherfcAPI';

export const Weatherfc = () => {
    const [Time, setTime] = useState("");
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState("");

    const [error, setError] = useState(true);
    const [loader, setLoader] = useState(true);

    const [checkTempDegree, setTempDegree] = useState("C");
    const [weatherFCData, setWeatherFCData] = useState({
        location: {},
        forecast: {
            forecastday: [
                {
                    date: "2023-06-15",
                    day: {}
                },
            ],
        },
        current: {},
    });

    const getWeatherFCHandler = async () => {
        setLoader(true);
        const weatherFC = await getWeatherFCDetails(cityName);
        const weatherFCData = await (weatherFC.data) || [];

        const customTime = moment.unix(weatherFCData?.location?.localtime_epoch).format('h:mm:ss A');
        setTime(customTime);
        setWeatherFCData({ ...weatherFCData });
        setLoader(false);
    }

    const cityNameHandler = (event) => {
        console.log(event.target.value);
        setCityName(event.target.value);
    }

    return (
        <>
            <div className="flex justify-center px-10 py-4 text-white">
                <Input
                    placeholder="Enter City"
                    className="w-full"
                    label="City:"
                    onChange={cityNameHandler}
                    value={cityName}
                />
            </div>
            <div className="flex justify-center items-center my-5 px-5">
                <button className='btn btn-outline rounded-none border-white text-white font-Montserrat' onClick={getWeatherFCHandler}>Enter</button>
            </div>
        </>
    )
}