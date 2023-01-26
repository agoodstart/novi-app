import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faLocationCrosshairs, faStar } from '@fortawesome/free-solid-svg-icons';

import Box from '../../components/Box/Box';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Button from '../../components/Button/Button';

import useTheme from '../../hooks/useTheme';
import useGoogleApi from "../../hooks/useGoogleApi";
import Typography from '../../components/Typography/Typography';

export default function TravelPlanDestinations({states, dispatch}) {
  const { colors } = useTheme();
  const { map } = useGoogleApi();

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
    <Box backgroundColor={colors.background.gray.alpha['15']} elevation={1} borderRadius={10} padding={15}>
      <Grid gridRows={5} rowGap={20}> 
        {states.chosenDestinations.map((destination, i) => (
          <GridItem key={i} rowStart={i}>
            <Box flexDirection="row" justifyContent="space-between" padding={10} alignItems="center" borderRadius={5} elevation={1} backgroundColor={colors.background.gray.alpha['30']}>
              <Box flexDirection="column" justifyContent="center" width={65}>
                <Typography fontWeight={700} elevation={1} variant="small">
                  {destination?.formattedAddress}
                </Typography>
                <Typography variant="xs" elevation={1}>
                  Temperature: {destination.temperature} &#8451; <br></br>
                  Distance: {destination.distance} km
                </Typography>
              </Box>

              <Box flexDirection="row" width={35} alignItems="center" justifyContent="end">
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
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}