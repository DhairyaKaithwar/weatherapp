import React, { useEffect,useState } from 'react'
import './Weather.css'
import search_icon from '../Assets/search.png'
import clear_icon from '../Assets/clear.png'
import drizzle_icon from '../Assets/drizzle.png'
import humidity_icon from '../Assets/humidity.png'
import rain_icon from '../Assets/rain.png'
import snow_icon from '../Assets/snow.png'
import wind_icon from '../Assets/wind.png'
import cloud_icon from '../Assets/cloud.png'

function Weather() {
    const [weatherData, setweatherData] = useState(false)
    const [cityName,setCityName]= useState("Delhi")
    const handleCityName =(e)=>{
        setCityName(e.target.value)
    }
    const handleClick=()=>{
        search(cityName);
    }
    useEffect(() => {
        search(cityName)
    }, [])
    
    const allIcons={
        "01d":clear_icon,
        "01n":clear_icon,
        "02d":cloud_icon,
        "02n":cloud_icon,
        "03d":cloud_icon,
        "03n":cloud_icon,
        "04d":drizzle_icon,
        "04n":drizzle_icon,
        "09d":rain_icon,
        "09n":rain_icon,
        "10d":rain_icon,
        "10n":rain_icon,
        "13d":snow_icon,
        "13n":snow_icon,
    }
    const search = async (city)=>{
        try{
            const apiKey = process.env.REACT_APP_WEATHER_API;
            const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            const response=await fetch(url)
            // console.log(response);
            
            let data=await response.json()
            console.log(data)
            const icon=allIcons[data.weather[0].icon] || clear_icon
            setweatherData({
                humidity: data.main.humidity,
                wind: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        }
        catch(err){
            console.error("Error fetching weather data:", err);
        }
    }
    // useEffect(() => {
    //   search("london");
    // }, [])
    
  return (
    <>
    
        <div className="weather">
            <div className="search-bar">
                <input onKeyDown={(e)=>{if(e.key==="Enter") handleClick()}} type="text" placeholder='Search your city...' name='name' onChange={handleCityName}/>
                <img src={search_icon} alt="search image" onClick={handleClick} />
            </div>

            <img src={weatherData.icon} alt="" className='weather-icon'  />
            <p className='temperature'>{weatherData.temperature}°</p>
            <p className='location'>{weatherData.location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity}%</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.wind} km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Weather
