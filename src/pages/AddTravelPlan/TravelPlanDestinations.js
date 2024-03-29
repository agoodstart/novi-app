import React from 'react';
import Typography from '../../components/Typography/Typography';
import Box from '../../components/Box/Box';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Button from '../../components/Button/Button';
import { Image } from '../../components/Media/Media';

import useTheme from '../../hooks/useTheme';
import useGoogleApi from "../../hooks/useGoogleApi";

export default function TravelPlanDestinations({states, dispatch}) {
  return (
    <Box>
      <Grid gridRows={5} rowGap={20}> 
        {states.chosenDestinations.map((destination, i) => (
          <GridItem key={i} rowStart={i}>
            <TravelPlanDestination dispatch={dispatch} destination={destination} chosen={states.chosen} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  )
}

function TravelPlanDestination({dispatch, chosen, destination}) {
  const { colors } = useTheme();

  const updateChosen = () => {

    if(destination.placeId === chosen.placeId) {
      dispatch({
        type: 'set_chosen',
        payload: {
          chosen: {}
        }
      })
    } else {
      dispatch({
        type: 'set_chosen',
        payload: {
          chosen: destination
        }
      })
    }
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
    <Box flexDirection="row" justifyContent="space-between" alignItems="center" borderRadius={5} backgroundColor={colors.background.gray.alpha['30']} customStyles={{
      position: 'relative',
      border: '1px solid rgba(0, 0, 0, .25)'
    }}>
      <Image source={destination.image} customStyles={{
        position: 'absolute',
        borderRadius: '5px',
        opacity: '0.5'
      }} />

      <Box flexDirection="column" justifyContent="center" width={65} padding={10}>
        <Typography fontWeight={700} elevation={1} variant="h2">
          {destination?.formattedAddress}
        </Typography>

        
        <Typography variant="h4" fontWeight={300} elevation={1}>
          Distance: {destination.distance} km
        </Typography>

        <Typography variant="h4" fontWeight={300} elevation={1}>
          Temperature: {destination.temperature} &#8451;
        </Typography>
      </Box>

      <Box flexDirection="column" width={35} alignItems="center" justifyContent="space-around">
        <Button type="button" color={colors.background.quaternary.light} elevation={1} size="large" onClick={updateChosen.bind(null, destination)} 
          customStyles={{
            marginRight: '20px',
            width: '75%',
            color: '#000'
          }}>
          Select
          {/* <FontAwesomeIcon icon={faStar} /> */}
        </Button>


        <Button 
          type="button"
          color={colors.background.secondary.main}
          size="large"
          elevation={1}
          onClick={onLocationRemove.bind(null, destination)}
          customStyles={{
            marginRight: '20px',
            width: '75%',
            color: '#000'
          }}
        >
          Remove
          {/* <FontAwesomeIcon icon={faXmark} /> */}
        </Button>
      </Box>
    </Box>
  )
}