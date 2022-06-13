import Openweather from "../../api/services/OpenWeather";
import { useEffect, useState } from "react";
import axios from "axios";
const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

export default function Location({location, index}) {
  const [currentWeather, setCurrentWeather] = useState('')

  useEffect(() => {
    console.log(index);

    axios.get('https://api.openweathermap.org/data/3.0/onecall', {
      params: {
        lat: location.latlng.lat,
        lon: location.latlng.lng,
        units: 'metric',
        appid: REACT_APP_OPENWEATHER_API_KEY,
      }
    }).then(result => {
      setCurrentWeather(result.data.current.temp);
    })
  }, [currentWeather])

  return (
    <div className="location">
      {location.addr}
    </div>
  )
}