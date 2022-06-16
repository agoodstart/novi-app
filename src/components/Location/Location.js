import React, { useRef, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

import Openweather from "../../api/services/OpenWeather";
import styles from './Location.module.scss';

import Button from "../Button/Button";
import Typography from "../Typography/Typography";

import useTheme from "../../hooks/useTheme";
const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

const Location = ({marker, calculateMarkerDistance, maxTravelDistance, onCenter, onRemove, gridPosition}) => {
  const locationRef = useRef();
  const { colors } = useTheme();
  const [currentWeather, setCurrentWeather] = useState('');
  const [markerDistance, setMarkerDistance] = useState(0);
  const [active, setActive] = useState(false)
  const [update, forceUpdate] = useState(false);

  const setData = useCallback(() => {
    console.log('bruh')
    setMarkerDistance(calculateMarkerDistance(marker))

    setTimeout(() => {
      axios.get('https://api.openweathermap.org/data/3.0/onecall', {
        params: {
          lat: marker.latlng.lat,
          lon: marker.latlng.lng,
          units: 'metric',
          appid: REACT_APP_OPENWEATHER_API_KEY,
        }
      }).then(result => {
        console.log('test');
        setCurrentWeather(result.data.current);
        setMarkerDistance(calculateMarkerDistance(marker))
      }).catch(e => {
        console.log('error')
      })
    }, 3000);
  }, [setMarkerDistance])

  useEffect(() => {
    setData()
  }, [setData]);

  useEffect(() => {
    console.log(markerDistance)
    if(markerDistance >= parseInt(maxTravelDistance) || !maxTravelDistance) {
      locationRef.current.style.background = `${colors.secondary.light}95`;
    } else {
      locationRef.current.style.background = `${colors.grey.light}95`;
    }

    forceUpdate(!update);
  }, [maxTravelDistance, markerDistance])


  const changeColor = () => {
    console.log(locationRef.current.style.background);
    locationRef.current.style.background = `${colors.quaternary.light}95`;
  }

  return (
    <div className={styles['location']} ref={locationRef} style={{
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
          customStyles={{
            zIndex: '9999'
          }}
          >
            <FontAwesomeIcon icon={faXmark} />
        </Button>
      </div>
    </div>
  )
}

export default Location;