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

const Location = ({marker, calculateMarkerDistance, maxTravelDistance, onCenter, onRemove, gridPosition, showWarning}) => {
  const locationRef = useRef();
  const { colors } = useTheme();
  const [currentWeather, setCurrentWeather] = useState('');
  const [markerDistance, setMarkerDistance] = useState(0);
  const [favorite, setFavorite] = useState(false);

  const setData = useCallback(() => {
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
    }, 1000);
  }, [setMarkerDistance, setCurrentWeather, marker])

  useEffect(() => {
    setData()
  }, [setData]);

  useEffect(() => {
    console.log('favorite')
    if(favorite) {
      locationRef.current.style.background = `${colors.quaternary.light}95`;
    } else if(markerDistance >= parseInt(maxTravelDistance) || !maxTravelDistance) {
      showWarning(marker.addr)
      locationRef.current.style.background = `${colors.secondary.light}95`;
    } else {
      locationRef.current.style.background = `${colors.grey.light}95`;
    }
  }, [maxTravelDistance, markerDistance, favorite]);

  const changeColor = () => {
    setFavorite(!favorite);
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
            marginRight: '10px',
            zIndex: '9999'
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