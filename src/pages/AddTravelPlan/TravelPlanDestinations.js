import React, {Suspense, useMemo} from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLocationCrosshairs, faStar } from '@fortawesome/free-solid-svg-icons';

import Typography from '../../components/Typography/Typography';
import Box from '../../components/Box/Box';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Button from '../../components/Button/Button';
import { Image } from '../../components/Media/Media';

import useTheme from '../../hooks/useTheme';
import useSuspense from '../../hooks/useSuspense';

import useGoogleApi from "../../hooks/useGoogleApi";

export default function TravelPlanDestinations({states, dispatch}) {
  const { colors } = useTheme();
  const { map } = useGoogleApi();

  return (
    <Box>
      <Grid gridRows={5} rowGap={20}> 
        {states.chosenDestinations.map((destination, i) => (
          <GridItem key={i} rowStart={i}>
            <TravelPlanDestination dispatch={dispatch} destination={destination} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

function TravelPlanDestination({dispatch, destination}) {
  const { colors } = useTheme();
  const suspender = useSuspense();
  // console.log(destination);

  const imageSource = useMemo(() => {
    return suspender.fetchPexelsAPI(destination.city);
  }, [destination.city]);

  const weatherInfoSource = useMemo(() => {
    return suspender.fetchOpenWeatherAPI(destination.latlng)
  }, [destination.latlng]);

  const updateChosen = (destination) => {
    // if(destination.placeId === props.chosen.placeId) {
    //   props.setChosen({})
    // } else {
    //   props.setChosen(destination);
    // }
  }

  const onLocationCenter = (destination) => {
    // map.panTo(destination.latlng);

    // dispatch({
    //   type: 'mapcenter_changed',
    //   payload: {

    //   }
    // })
  }

  const onLocationRemove = (destination) => {
    dispatch({
      type: 'remove_destination',
      payload: {
        placeId: destination.placeId
      }
    })
    // props.setDestinations(props.destinations.filter(destination => destination.placeId !== destination.placeId))
  }

  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" borderRadius={5} elevation={1} backgroundColor={colors.background.gray.alpha['30']} customStyles={{
      position: 'relative'
    }}>
      <Suspense>
        <TravelPlanImageSuspender imageSource={imageSource} />
      </Suspense>

      <Box flexDirection="column" justifyContent="center" width={65} padding={10}>
        <Typography fontWeight={700} elevation={1} variant="h2">
          {destination?.formattedAddress}
        </Typography>

        
        <Typography variant="h4" fontWeight={300} elevation={1}>
          Distance: {destination.distance} km
        </Typography>

        <Suspense>
          <TravelPlanWeatherSuspender weatherInfoSource={weatherInfoSource} />
        </Suspense>
      </Box>

      <Box flexDirection="column" width={35} alignItems="center" justifyContent="end">
        <Button color={colors.background.quaternary.light} elevation={1} size="small" onClick={updateChosen.bind(null, destination)} 
          customStyles={{
            marginRight: '10px',
          }}>
          <FontAwesomeIcon icon={faStar} />
        </Button>

        <Button 
          color={colors.background.tertiary.dark} elevation={1} size="small" onClick={onLocationCenter.bind(null, destination)}
          customStyles={{
            marginRight: '10px',
          }}>
          <FontAwesomeIcon icon={faLocationCrosshairs} />
        </Button>

        <Button 
          color={colors.background.secondary.main}
          size="small"
          elevation={1}
          onClick={onLocationRemove.bind(null, destination)}
        >
          <FontAwesomeIcon icon={faXmark} />
        </Button>
      </Box>
    </Box>
  )
}

function TravelPlanImageSuspender({imageSource}) {
  const image = imageSource.read();

  console.log(image);
  return (
    <Image source={image} customStyles={{
      position: 'absolute',
      borderRadius: '5px',
      opacity: '0.5'
    }} />
  )
}

function TravelPlanWeatherSuspender({weatherInfoSource}) {
  const weatherInfo = weatherInfoSource.read();
  console.log(weatherInfo);

  return (
    <Typography variant="h4" fontWeight={300} elevation={1}>
      Temperature: {weatherInfo.current.temp} &#8451;
    </Typography>
  )
}