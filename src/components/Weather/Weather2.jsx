import React, { useState, useEffect } from 'react'
import { getWeatherDetails } from '../../shared/api/WeatherAPI'
import moment from 'moment/moment';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../../shared/ErrorMessage';

export const Weather2 = () => {

    const [Region, setRegion] = useState("");
    const [Time, setTime] = useState("");
    const [Country, setCountry] = useState("");
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState("");

    const [error, setError] = useState(true);
    const [loader, setLoader] = useState(true);

    const [checkTempDegree, setTempDegree] = useState("C");

    const [weatherDetails, setWeatherDetails] = useState({
        current: {
            condition: {},
        },
        location: {},
    });

    const getCurrWeatherHandler = async () => {
        const weatherDetails = await getWeatherDetails(cityName);
        const weatherData = (await weatherDetails.data) || [];

        console.log(weatherData?.location)

        setRegion(weatherData?.location?.region)
        setCountry(weatherData?.location?.country)
        const customTime = moment.unix(weatherData?.location?.localtime_epoch).format('h:mm:ss A');
        setTime(customTime);

        if (weatherData.location) {
            setLoader(false);
            setError(false);
        } else if (cityName != null) {
            setError(true);
            setLoader(true);
        } else {
            setLoader(true);
        }
        setWeather(weatherData?.current?.condition?.text)
        setWeatherDetails({ ...weatherData });
    };

    useEffect(() => {
        console.log(weatherDetails);
    }, [weatherDetails]);

    const cityNameHandler = (event) => {
        console.log(event.target.value);
        setCityName(event.target.value);
    }

    return (
        <>
            <div className="flex justify-end items-center px-4 py-4">
                <span class="material-symbols-outlined flex justify-start px-5">
                    sunny
                </span>
                <button className="btn btn-square rounded-none border-black" onClick={() => setTempDegree("F")}> &deg; F</button>
                <button className="btn btn-square rounded-none border-black" onClick={() => setTempDegree("C")}> &deg; C</button>
            </div>

            <div className="flex justify-center items-center mx-30rem ">
                <p style={{ margin: "1rem 0 0 0 " }}>
                    <div>
                        <span className="font-Kanit text-4xl font-semibold">
                            {weatherDetails.location.name} Weather (Today)
                        </span>
                    </div>
                    <div>
                        <span className="text-2xl font-Kanit">
                            {weatherDetails.location.region}, {weatherDetails.location.country}
                        </span>
                    </div>
                </p>
            </div>

            {/* <figure className="flex justify-center">
                <img
                    height={100}
                    width={100}
                    src={"https:" + weatherDetails.current.condition.icon}
                    alt="weatherimage"
                />
            </figure> */}

            <div className="flex justify-center">
                <Input
                    placeholder="Enter City"
                    className="w-full"
                    label="City:"
                    onChange={cityNameHandler}
                    value={cityName}
                />
            </div>

            {error && <ErrorMessage />}

            <div className="flex justify-center items-center my-10 mx-5 py-5 px-10">
                {loader ? (<Loader />) : (
                    <div className="flex justify-center items-center font-Kanit">
                        <div className="px-10">City: {cityName}</div>
                        <div className="px-10">Region: {Region}</div>
                        <div className="px-10">Time: {Time}</div>
                        <div className="px-10">Country: {Country}</div>
                        <div className="px-10">Temperature:
                            {checkTempDegree === "C" && (
                                <span>{weatherDetails.current.temp_c} &deg;C</span>
                            )}{""}
                            {checkTempDegree === "F" && (
                                <span>{weatherDetails.current.temp_f} &deg;F</span>
                            )}{""}</div>

                        <div className="px-10">Weather: {weather}</div>
                    </div>)}
            </div>
            <div className="flex justify-center items-center my-5">
                <Button className='btn btn-dark btn-outline rounded-none' buttonname="Enter" onClick={getCurrWeatherHandler} />
            </div>
        </>
    )
}
