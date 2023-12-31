import React, { useState, useEffect } from 'react'
import { getWeatherDetails } from '../../shared/api/WeatherAPI'
import moment from 'moment/moment';
import Input from '../../shared/Input';
import { Loader } from '../Loader/Loader';
import { ErrorMessage } from '../../shared/ErrorMessage';
import { Credits } from '../../shared/Credits';
import { Header } from '../../shared/Header';

export const Weather2 = () => {
    const [Time, setTime] = useState("");
    const [cityName, setCityName] = useState("");
    const [weather, setWeather] = useState("");

    const [error, setError] = useState(true);
    const [loader, setLoader] = useState(true);

    const [checkTempDegree, setTempDegree] = useState("C");
    const [checkPrecipMetric, setMetric] = useState("IN");


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

        const customTime = moment.unix(weatherData?.location?.localtime_epoch).format('h:mm:ss A');
        setTime(customTime);

        if (weatherData.location) {
            setLoader(false);
            setError(false);
        } else {
            setError(true);
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
            {/* buttons for interchanging between farenheit and celsius */}
            {/* Heading with dynamic cityName change*/}

            <div id="Header" className="flex justify-between text-white">
                <Header />

                <div className="flex justify-end">
                    <div className="flex justify-end items-center px-4 py-4 pr-8">
                        <span class="material-symbols-outlined flex justify-start px-5">
                            thermometer
                        </span>
                        <button className="btn btn-outline rounded-none text-white" onClick={() => setTempDegree("F")}> &deg;F</button>
                        <button className="btn btn-outline rounded-none text-white" onClick={() => setTempDegree("C")}> &deg;C</button>
                        <span class="material-symbols-outlined flex justify-start px-5">
                            water_drop
                        </span>
                        <button className="btn btn-outline rounded-none text-white" onClick={() => setMetric("IN")}> in</button>
                        <button className="btn btn-outline rounded-none text-white" onClick={() => setMetric("MM")}> mm</button>
                    </div>
                </div>
            </div>

            <div className="flex justify-center items-center px-10 text-white">
                <p style={{ margin: "4rem 0 0 0 " }}>
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

            {/*Input box for cityName */}
            <div className="flex justify-center px-10 py-4 text-white">
                <Input
                    placeholder="Enter City"
                    className="w-full"
                    label="City:"
                    onChange={cityNameHandler}
                    value={cityName}
                />
            </div>

            {error && <ErrorMessage />}

            <div className="flex justify-center items-center my-10 text-white">
                {loader ? (<Loader />) : (
                    <div className="flex justify-between text-center font-Kanit">

                        <div className="px-10">
                            <div>
                                <span class="material-symbols-outlined">
                                    schedule
                                </span>
                            </div>
                            <div>Time: {Time}</div>
                        </div>


                        <div className="px-10">
                            <div><span class="material-symbols-outlined">
                                thermostat
                            </span></div>
                            <div>Temperature:
                                {checkTempDegree === "C" && (
                                    <span>{weatherDetails.current.temp_c} &deg;C</span>
                                )}{" "}
                                {checkTempDegree === "F" && (
                                    <span>{weatherDetails.current.temp_f} &deg;F</span>
                                )}{" "}
                            </div>
                        </div>

                        <div className="px-10">
                            <div><span class="material-symbols-outlined">
                                face
                            </span></div><div>Feels Like:
                                {checkTempDegree === "C" && (
                                    <span>{weatherDetails.current.feelslike_c} &deg;C</span>
                                )}{" "}
                                {checkTempDegree === "F" && (
                                    <span>{weatherDetails.current.feelslike_f} &deg;F</span>
                                )}{" "}
                            </div>
                        </div>

                        <div className="px-10">
                            <div><span class="material-symbols-outlined">
                                clear_day
                            </span></div>
                            <div>Weather: {weather}</div>
                        </div>

                        <div className="px-10">
                            <div><span class="material-symbols-outlined">
                                rainy_light
                            </span></div>
                            <div>Precipitation: {
                                checkPrecipMetric === "IN" && (
                                    <span>{weatherDetails.current.precip_in}in</span>
                                )}{""}
                                {checkPrecipMetric === "MM" && (
                                    <span>{weatherDetails.current.precip_mm}mm</span>
                                )}{""}
                            </div>
                        </div>
                    </div>)
                }
            </div>

            <div className="flex justify-center items-center my-5 px-5">
                <button className='btn btn-outline rounded-none border-white text-white font-Montserrat' onClick={getCurrWeatherHandler}>Enter</button>
            </div>
            <Credits />
        </>
    )
}
