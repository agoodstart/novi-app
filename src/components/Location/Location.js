import Openweather from "../../api/services/OpenWeather";
import React, { useRef, useEffect, useState } from "react";
import Button from "../Button/Button";
import useTheme from "../../hooks/useTheme";
import styles from './Location.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faXmark, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

const Location = ({marker, calculateMarkerDistance, onCenter}) => {
  const locationRef = useRef();
  const { colors } = useTheme();
  const [currentWeather, setCurrentWeather] = useState('');
  const [markerDistance, setMarkerDistance] = useState(0);

  useEffect(() => {
    console.log('test')
    axios.get('https://api.openweathermap.org/data/3.0/onecall', {
      params: {
        lat: marker.latlng.lat,
        lon: marker.latlng.lng,
        units: 'metric',
        appid: REACT_APP_OPENWEATHER_API_KEY,
      }
    }).then(result => {
      setCurrentWeather(result.data.current);
      setMarkerDistance(calculateMarkerDistance(marker))
    })
  }, []);

  return (
    <div className={styles['location']}>
      <div className={styles['location__info']}>
        <p>{marker.addr}</p>
        <p>Temperature: {currentWeather.temp} &#8451;</p>
        <p>Distance: {markerDistance} km</p>
      </div>
      <div className={styles['location__buttons']}>
      <Button 
          color={colors.tertiary.dark}
          variant="contained"
          size="small"
          boxShadow="light"
          onClick={onCenter.bind(this, marker)}
          customStyles={{
            marginRight: '10px'
          }}
          >
            <FontAwesomeIcon icon={faLocationCrosshairs} />
        </Button>

        <Button 
          color={colors.primary.medium}
          variant="contained"
          size="small"
          boxShadow="light"
          onClick={() => {}}
          customStyles={{
            marginRight: '10px'
          }}
          >
            <FontAwesomeIcon icon={faPlus} />
        </Button>
        
        <Button 
          color={colors.secondary.medium}
          variant="contained"
          size="small"
          boxShadow="light"
          onClick={() => {}}
          >
            <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </div>
  )
}

export default Location;