import React, { useState } from 'react';
import { fetchWeather } from './api/fetchWeather';
import './App.css';


const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (e) => {
        if (e.key === 'Enter') {
            const data = await fetchWeather(query);

            setWeather(data);
            setQuery('');
        }
    }

    let d = new Date();
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";

    let dd = String(d.getDate()).padStart(2, '0');
    let mm = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = d.getFullYear();

    let date = mm + '/' + dd + '/' + yyyy;

    console.log(weather);

    return (
        <>
            <input type="text" className="search" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} onKeyPress={search} />
            <div className="container">
                {weather.main && (
                    <>
                        <div className="weather-side">
                            <div className="weather-gradient"></div>
                            <div className="date-container">
                                <h2 className="date-dayname">{weekday[d.getDay()]}</h2><span className="date-day">{date}</span><i className="location-icon" data-feather="map-pin"></i><span className="location">{weather.name}, {weather.sys.country}</span></div>
                            <div className="weather-container"><i className="weather-icon" data-feather="sun"></i>
                                <h1 className="weather-temp">{weather.main.temp}°C</h1>
                                <h3 className="weather-desc">{weather.weather[0].description}</h3>
                            </div>
                        </div>
                        <div className="info-side">
                            <div className="today-info-container">
                                <div className="today-info">
                                    <div className="precipitation"> <span className="title">FEELS LIKE</span><span className="value">{weather.main.feels_like}°C</span>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="humidity"> <span className="title">HUMIDITY</span><span className="value">{weather.main.humidity} %</span>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="wind"> <span className="title">WIND</span><span className="value">{weather.wind.speed} km/h</span>
                                        <div className="clear"></div>
                                    </div>
                                </div>
                            </div>
                            <div className="week-container">
                                <ul className="week-list">
                                    <li className="active"><i className="day-icon" data-feather="sun"></i><span className="day-name">{weekday[d.getDay()]}</span><span className="day-temp">29°C</span></li>
                                    <li><i className="day-icon" data-feather="cloud"></i><span className="day-name">{weekday[d.getDay() + 1]}</span><span className="day-temp">21°C</span></li>
                                    <li><i className="day-icon" data-feather="cloud-snow"></i><span className="day-name">{weekday[d.getDay() + 2]}</span><span className="day-temp">08°C</span></li>
                                    <li><i className="day-icon" data-feather="cloud-rain"></i><span className="day-name">{weekday[d.getDay() + 3]}</span><span className="day-temp">19°C</span></li>
                                    <div className="clear"></div>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>

    );
}

export default App;