import Openweather from "../../api/services/OpenWeather";
import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import useTheme from "../../hooks/useTheme";
import styles from './Location.module.scss';
import axios from "axios";
const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

const Location = React.memo(({location, index}) => {
  const { colors } = useTheme();
  const [currentWeather, setCurrentWeather] = useState('')

  // useEffect(() => {
  //   console.log(index);

  //   axios.get('https://api.openweathermap.org/data/3.0/onecall', {
  //     params: {
  //       lat: location.latlng.lat,
  //       lon: location.latlng.lng,
  //       units: 'metric',
  //       appid: REACT_APP_OPENWEATHER_API_KEY,
  //     }
  //   }).then(result => {
  //     setCurrentWeather(result.data.current);
  //   })
  // }, []);

  // useEffect(() => {
  //   console.log(currentWeather);
  // })

  return (
    <div className={styles['location']}>
      <div className={styles['location__info']}>
        <p>{location.addr}</p>
        <p>Temperature: 21.83 &#8451; </p>
      </div>
      <div className={styles['location__buttons']}>
        <Button 
          color={colors.primary.medium}
          variant="contained"
          size="small"
          boxShadow="light"
          onClick={() => {}}
          customStyles={{
            marginBottom: '10px'
          }}
          >
            Set Destination
        </Button>
        
        <Button 
          color={colors.secondary.medium}
          variant="contained"
          size="small"
          boxShadow="light"
          onClick={() => {}}
          >
            Remove Destination
        </Button>
      </div>
    </div>
  )
})

export default Location;