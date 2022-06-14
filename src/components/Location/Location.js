import Openweather from "../../api/services/OpenWeather";
import React, { useEffect, useState } from "react";
import axios from "axios";
const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

const Location = React.memo(({location, index}) => {
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
      setCurrentWeather(result.data.current);
      console.log(result.data.current)
    })
  }, []);

  return (
    <div className="location">
      {location.addr}
    </div>
  )
})

export default Location;