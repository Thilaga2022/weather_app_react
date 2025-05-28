import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Weather = () => {

    // To get and handle required datas 
    // To get city name from input and handle it
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState('')
    const [temp, setTemp] = useState('')
    const [humid, setHumid] = useState('')
    const [icon, setIcon] = useState('')
    const [quote, setQuote] = useState('')

    // To display random poetic quotes based on weather

    const weatherQuotes = {
        Clear: [
            "☀️ The sun is out, and so is the joy!",
            "🌈 Clear skies call for clear thoughts.",
            "🕶️ A perfect day to soak in the sunshine.",
            "🌞 Golden rays lighting up your path.",
            "😎 The sky smiles wide today — embrace it!"
        ],
        Clouds: [
            "☁️ Gray skies, warm hearts.",
            "🧣 A cozy day under a blanket of clouds.",
            "📖 Let the clouds slow you down gently.",
            "🌥️ Peace lives in overcast skies.",
            "🛋️ Soft skies for quiet minds."
        ],
        Rain: [
            "🌧️ Raindrops dancing — nature’s lullaby.",
            "☔ Umbrellas up, hearts open.",
            "🎶 The rhythm of the rain is poetry itself.",
            "💧 Let the rain wash your worries away.",
            "🫖 A rainy day to pause and reflect."
        ],
        Snow: [
            "❄️ Snowflakes falling like whispers from the sky.",
            "☃️ A white blanket hugs the world.",
            "🧤 Cold hands, warm heart, snowy start.",
            "🔇 Nature’s softest silence — snow.",
            "🌨️ Winter's charm in every flake."
        ],
        Thunderstorm: [
            "🌩️ Thunder speaks, and the skies listen.",
            "🎇 A wild symphony in the sky.",
            "⚡ When clouds roar, nature is alive.",
            "🌪️ A thunderstorm — nature’s fierce art show.",
            "🎭 Bold skies, electric thoughts."
        ],
        Default: [
            "🌎 Every weather holds its own magic.",
            "📜 Let nature write the mood of the day.",
            "💫 No matter the skies, your spirit can shine.",
            "🧘 Embrace the moment, whatever the weather.",
            "🌦️ The weather changes, and so can you."
        ]
    };
    // Logic for getting random quotes

    const getRandomQuote = (condition) => {
        const category = weatherQuotes[condition] ? condition : "Default";
        const quotesArray = weatherQuotes[category];
        const index = Math.floor(Math.random() * quotesArray.length);
        return quotesArray[index];
    };
    // This will be called on input box with even onChange
    function handleCity(event) {
        setCity(event.target.value)
    }

    function getWeather() {
        // Using backticks to insert the city variable into the API URL dynamically
        const weatherData = axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f75d4172587239cd962c4c6a4c2ef1fb`)

        weatherData.then(function (success) {
            // success is a dummy variable which stores all objects that api returns. When we write success.data it will just show only that particular object values
            console.log(success.data)
            setWeather(success.data.weather[0].main)
            setTemp((success.data.main.temp - 273.15).toFixed(1))
            setHumid(success.data.main.humidity)
            setIcon(success.data.weather[0].icon)
            setQuote(getRandomQuote(success.data.weather[0].main));

        }).catch(function (errmsg) {
            console.log(errmsg)
            alert("City not found. Please enter a valid city name.")
        })
    }

    return (
        <div>
            <h2 style={{ color: 'black' }}>Weather Report</h2>
            <p style={{ color: 'rgb(50, 53, 57)' }}>I give you weather report about the city you enter !</p>
            <input onChange={handleCity} style={{ padding: '10px', border: '1px solid black', borderRadius: '5%' }} type="text" placeholder='Enter City Name' /> <br />
            <button onClick={getWeather} style={{ color: 'white', background: 'black', marginTop: '2vh' }} type="submit">Get Report ⛅</button>
            <h4 style={{ color: 'black' }}>
                Weather : {weather} {icon && (
                    // construct the api url to display icon else icon number oly displayed
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt="weather icon"
                        style={{ verticalAlign: 'middle', width: '40px', height: '40px' }}
                    />
                )}
            </h4>

            <p>{quote}</p>
            <h4 style={{ color: 'black' }}>Temperature : {temp}°C</h4>
            <h4 style={{ color: 'black' }}>Humidity : {humid}%</h4>
        </div>
    )
}

export default Weather
