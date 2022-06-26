import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';

import Typography from '../../../components/Typography/Typography';
import Image from '../../../components/Image/Image';

import styles from './Destination.module.scss';

// import { TranslationServiceClient } from '@google-cloud/translate';

import useLocalStorage from '../../../hooks/useLocalStorage';
const { REACT_APP_PEXELS_API_KEY } = process.env;

export default function Destination() {
  const params = useParams();
  const {colors} = useTheme();
  

  const [savedDestination, setSavedDestination] = useState(null);
  const [imageSource, setImageSource] = useState("");
  const [destinations, setDestinations] = useLocalStorage("destinations", []);

  const setData = useCallback(() => {
    setSavedDestination(destinations.find(destination => destination.placeId === params.id));
  }, [setSavedDestination])

  useEffect(() => {
    setData();
  }, [setData]);

  useEffect(() => {
    console.log(savedDestination);
    if(savedDestination) {
      axios.get(`https://api.pexels.com/v1/search?query=${savedDestination.city.short_name}`, {
        headers: {
          "Authorization": REACT_APP_PEXELS_API_KEY
        }
      }).then(result => {
        console.log(result.data.photos[0])
        setImageSource(result.data.photos[0].src.original);
      })
    }
  }, [savedDestination])

  useEffect(() => {
    console.log(imageSource);
  }, [imageSource])

  return(
    <>
      <div className={styles['destination__headline']}>
        <Typography textColor={colors.grey.dark} variant="h1">
          {savedDestination?.city.long_name}
        </Typography>

        <Typography variant="h2">
          {savedDestination?.country.long_name}
        </Typography>
      </div>

      {/* <Image source={imageSource} /> */}
    </>
  )
}