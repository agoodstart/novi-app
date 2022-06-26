import React, { useRef, useCallback, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

import styles from './Location.module.scss';

import Button from "../Button/Button";
import Typography from "../Typography/Typography";

import useTheme from "../../hooks/useTheme";
const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

const Location = ({
  destination, 
  origin, 
  chosen,
  maxTravelDistance, 
  updateMarkerInfo, 
  updateChosen,
  onCenter, 
  onRemove, 
  gridPosition, 
  showWarning
}) => {
  const locationRef = useRef();
  const { colors } = useTheme();

  const calculateMarkerDistance = () => {
    const R = 6371.0710 // Radius of earth in km
    // var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = origin.latlng.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = destination.latlng.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (destination.latlng.lng-origin.latlng.lng) * (Math.PI/180); // Radian difference (longitudes)
  
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d.toFixed(2);
  }

  const setData = useCallback(() => {
    setTimeout(() => {
      axios.get('https://api.openweathermap.org/data/3.0/onecall', {
        params: {
          lat: destination.latlng.lat,
          lon: destination.latlng.lng,
          units: 'metric',
          appid: REACT_APP_OPENWEATHER_API_KEY,
        }
      }).then(result => {
        updateMarkerInfo(result.data.current.temp, calculateMarkerDistance(), destination);
      }).catch(e => {
        console.log('error')
      })
    }, 1000);
  }, [destination])

  useEffect(() => {
    setData()
  }, [setData]);

  useEffect(() => {
    if(chosen.placeId === destination.placeId) {
      locationRef.current.style.background = `${colors.quaternary.light}95`;
    } else if(destination.distance >= parseInt(maxTravelDistance) || !maxTravelDistance) {
      showWarning(`${destination.formattedAddress} is not within the specified travel distance range`)
      locationRef.current.style.background = `${colors.secondary.light}95`;
    } else {
      locationRef.current.style.background = `${colors.grey.light}95`;
    }
  }, [maxTravelDistance, destination, chosen]);

  const changeColor = () => {
    updateChosen(destination);
  }

  return (
    <div className={styles['location']} ref={locationRef} style={{
      gridArea: gridPosition
    }} onClick={changeColor}>
      <div className={styles['location__info']}>
        <Typography variant="paragraph">
          {destination.formattedAddress}
        </Typography>
        <p>Temperature: {destination.temperature} &#8451;</p>
        <p>Distance: {destination.distance} km</p>
      </div>
      <div className={styles['location__buttons']}>
      <Button 
          color={colors.tertiary.dark}
          variant="contained"
          size="small"
          boxShadow="light"
          onClick={onCenter.bind(this, destination)}
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
          onClick={onRemove.bind(this, destination)}
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