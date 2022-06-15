import Openweather from "../../api/services/OpenWeather";
import React, { useRef, useEffect, useState } from "react";
import Button from "../Button/Button";
import useTheme from "../../hooks/useTheme";
import styles from './Location.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Typography from "../Typography/Typography";
import { faXmark, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

const Location = ({marker, calculateMarkerDistance, onCenter, onRemove, gridPosition}) => {
  const locationRef = useRef();
  const { colors } = useTheme();
  const [currentWeather, setCurrentWeather] = useState('');
  const [markerDistance, setMarkerDistance] = useState(0);
  const [isActive, setIsActive] = useState(false)

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

  const changeColor = () => {
    setIsActive(isActive => !isActive)
  }

  return (
    <div className={styles['location']} style={{
      background: !isActive ? '#6ec5b495' : 'linear-gradient(to right, #e4b36380, #cdaf5480, #b4aa4980, #99a54180, #7da03d80)',
      gridArea: gridPosition
    }} onClick={changeColor}>
      <div className={styles['location__info']}>
        <Typography variant="paragraph">
          {marker.addr}
        </Typography>
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
          color={colors.secondary.medium}
          variant="contained"
          size="small"
          boxShadow="light"
          onClick={onRemove.bind(this, marker)}
          >
            <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </div>
  )
}

export default Location;