import { useCallback } from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

import useTheme from '../../../hooks/useTheme';
import useLocalStorage from '../../../hooks/useLocalStorage';

import Typography from '../../../components/Typography/Typography';
import Image from '../../../components/Image/Image';
import Center from '../../../components/Center/Center';
import { Tabs, Tab, TabList, TabPanel } from '../../../components/Tabs/Tabs';

import styles from './Destination.module.scss';

import Currency from './Currency';
import MemoizedDestinationTabs from './DestinationTabs';
const { REACT_APP_PEXELS_API_KEY } = process.env;

export default function Destination() {
  console.log('hello');
  const params = useParams();
  const {colors} = useTheme();
  
  const [savedDestination, setSavedDestination] = useState(null);
  const [imageSource, setImageSource] = useState("");
  const [destinations, setDestinations] = useLocalStorage("destinations", []);

  const setData = useCallback(() => {
    setSavedDestination(destinations.find(destination => destination.placeId === params.id));
  }, [setSavedDestination])

  useEffect(() => {
    console.log('test');
    setData();
  }, [setData]);

  useEffect(() => {
    if(savedDestination) {
      axios.get(`https://api.pexels.com/v1/search?query=${savedDestination.city.short_name}&orientation=landscape`, {
        headers: {
          "Authorization": REACT_APP_PEXELS_API_KEY
        }
      }).then(result => {
        setImageSource(result.data.photos[0].src.landscape);
      })
    }
  }, [savedDestination])

  return(
    <>
      <div className={styles['destination__headline']}>
      <Image source={imageSource} />

        <Center>
          <Typography fontWeight="700" textShadow textColor={colors.white} variant="h1">
            {savedDestination?.city.long_name}
          </Typography>

          <Typography textShadow textColor={colors.white} variant="h2">
            {savedDestination?.country.long_name}
          </Typography>
        </Center>
      </div>

      <div className={styles['destination__tabs']}>
        <MemoizedDestinationTabs />
      </div>
      {/* <Currency styles={styles} /> */}
    </>
  )
}