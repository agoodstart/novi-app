import React, { useEffect, useState, Suspense, useMemo, useReducer } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

import { Parallax } from 'react-scroll-parallax';

import TravelPlanMap from './TravelPlanMap';
import TravelPlanControl from './TravelPlanControl';
import TravelPlanDestinations from './TravelPlanDestinations';
import TravelPlanChoices from './TravelPlanChoices';
import TravelPlanModal from './TravelPlanModal';

import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Typography from '../../components/Typography/Typography';

import useSuspense from '../../hooks/useSuspense';
import useLocalStorage from '../../hooks/useLocalStorage';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

const calculateDistanceScore = (distance, maxTravelDistance) => {
  let score = 0;
  let [q1, q2, q3, q4] = [maxTravelDistance / 4, maxTravelDistance / 3, maxTravelDistance / 2, maxTravelDistance];

  if(distance > 0 && distance < q1) {
    score = 4;
  } else if(distance > q1 && distance < q2) {
    score = 3;
  } else if(distance > q2 && distance < q3) {
    score = 2;
  } else if(distance > q3 && distance < q4) {
    score = 1;
  } else if(distance > q4) {
    score = -1;
  }

  return score;
}

const calculateWeatherScore = (temperature) => {
  let score = 0;
  let [q1, q2, q3, q4] = [30, 25, 20, 15];

  if(temperature > q2 && temperature < q1) {
    score = 4;
  } else if(temperature > q3 && temperature < q2) {
    score = 3;
  } else if(temperature > q4 && temperature < q3) {
    score = 1; 
  } else if(temperature > q1) {
    score = 2
  }

  return score;
}

const initialStates = {
  // 
  placeOrigin: "",
  placeCenter: "",

  maxTravelDistance: 1000,
  mapZoom: 7,
  mapCenter: {},
  pointToPoint: [],

  origin: {},
  lockedDestinations: [],
  chosenDestinations: [],

  recommendedDestination: {},
  favoriteDestination: {},
}

const reducer = (states, action) => {
  switch(action.type) {
    case 'traveldistance_changed':
      return {
        ...states,

        maxTravelDistance: action.payload.maxTravelDistance
      }
    case 'destination_added':
      return {
        ...states,

        chosenDestinations:  [{
          latlng: action.payload.latlng,
          city: action.payload.city,
          country: action.payload.country,
          formattedAddress: action.payload.formattedAddress,
          placeId: action.payload.placeId,
          distance: action.payload.distance,
          temperature: action.payload.temperature
        }, ...states.chosenDestinations]
      }
    // triggers when the userlocation changes. happens when the page loads for the first time, or when user changes their current location
    case 'map_origin_changed':
      return {
        ...states,

        placeOrigin: action.payload.formattedAddress,
        placeCenter: action.payload.formattedAddress,
        origin: {
          city: action.payload.city,
          country: action.payload.country,
          latlng: action.payload.latlng,
          formattedAddress: action.payload.formattedAddress,
          placeId: action.payload.placeId
        },

        lockedDestinations: action.payload.lockedDestinations,
        mapCenter: action.payload.latlng,
      }
    // same as map_origin_changed, but without modifying the user location.
    // happens when dragging the map, changing the center in autocomplete, or by clicking on the 'center button' on one of the chosen destinations
    case 'map_center_changed':
      return {
        ...states,

        placeCenter: action.payload.formattedAddress,
        lockedDestinations: action.payload.lockedDestinations,
        mapCenter: action.payload.latlng,
      }
    case 'map_zoomed':
      return {
        ...states,

        mapZoom: action.payload.mapZoom,
      }
    case 'map_dragged':
      return {
        ...states,

        mapCenter: action.payload.mapCenter,
        placeCenter: action.payload.formattedAddress,
        lockedDestinations: action.payload.lockedDestinations,
      }
    case 'show_recommended':
      return {
        ...states,

        recommendedDestination: states.chosenDestinations.reduce((prev, curr) => {
          let [
            prevScore, 
            currScore
          ] = [
            calculateDistanceScore(prev.distance, states.maxTravelDistance) + calculateWeatherScore(prev.temperature), 
            calculateDistanceScore(curr.distance, states.maxTravelDistance) + calculateWeatherScore(curr.temperature)
          ];
  
          if(prevScore > currScore) {
            return prev;
          } else {
            return curr;
          }
        })
      }
    case 'remove_recommended':
      return {
        ...states,

        recommendedDestination: {},
      }
  }
}

export default function AddTravelPlan() {
  const suspender = useSuspense();
  const navigate = useNavigate();
  const { modalRef } = useAuth();
  const { colors } = useTheme();

  const [states, dispatch] = useReducer(reducer, initialStates)
  const [savedDestinations, setSavedDestinations] = useLocalStorage("destinations", []);

  const deviceLocation = useMemo(() => {
    return suspender.fetchCurrentLocation({ lat: 52.132633, lng: 5.2912659 });
  }, []);

  const showWarning = (text) => {
    toast.warn(text);
  }

  const handleOpenModal = () => {
    modalRef.current.openModal();
  }

  const handleCloseModal = () => {
    modalRef.current.closeModal();
  }

  const saveDestination = () => {
    setSavedDestinations(savedDestinations.concat([states.chosen]));
    navigate('/destinations');
  }

  const checkSaveButton = (target) => {
    if(Object.keys(states.chosen).length === 0) {
      target.disabled = true;
    } else {
      target.disabled = false;
    }
  }

  useEffect(() => {
    console.log(states.mapCenter);
  }, [states.mapCenter])

  useEffect(() => {
    if(states.chosenDestinations.length > 0) {
      states.chosenDestinations.forEach(destination => {
        if(destination.distance >= parseInt(states.maxTravelDistance) || !states.maxTravelDistance) {
          showWarning(`${destination.formattedAddress} is not within the specified travel distance range`);
        }
      })
    }
  }, [states.chosenDestinations, states.maxTravelDistance]);

  useEffect(() => {
    if(states.chosenDestinations.length >= 2) {
      dispatch({
        type: 'show_recommended',
      })
    } else {
      dispatch({
        type: 'remove_recommended'
      })
    }
  }, [states.chosenDestinations]);

  return (
    <React.Fragment>
      <Parallax speed={-50}>
        <Container element="section" backgroundColor={colors.background.black.alpha['15']} >
          <Grid gridRows={8} gridColumns={8} rowGap={15} columnGap={15}>

            <GridItem rowStart={1} columnStart={1} rowEnd={1} columnEnd={9}>
              <TravelPlanControl 
                states={states}
                dispatch={dispatch} />
            </GridItem>

            <GridItem rowStart={2} columnStart={1} rowEnd={8} columnEnd={9}>
              <Suspense fallback={<Typography variant="h1">Loading Google Maps... </Typography>}>
                <TravelPlanMap 
                  dispatch={dispatch}
                  states={states}
                  deviceLocation={deviceLocation}
                  showWarning={showWarning} />
              </Suspense>
            </GridItem>
          </Grid>

          {/* <TravelPlanModal chosen={states.chosen} modalRef={modalRef} saveDestination={saveDestination} handleCloseModal={handleCloseModal} /> */}
        </Container>
      </Parallax>
      <Parallax speed={30}
        translateY={['-100px', '100px', 'easeIn']}>
      <Container element="section" backgroundColor={colors.background.white.main} customStyles={{
        boxShadow: "0 -5px 5px -5px #333",
        zIndex: "9999"
      }}>
          {/* <TravelPlanDestinations 
            states={states}
            dispatch={dispatch}
          /> */}
      </Container>
      </Parallax>
    </React.Fragment>
  )
}