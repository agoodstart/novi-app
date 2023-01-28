import axios from 'axios';
import React, { useEffect, Suspense, useMemo, useReducer } from 'react';
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
import useAmadeusApi from '../../hooks/useAmadeusApi';

const { REACT_APP_OPENWEATHER_API_KEY, REACT_APP_PEXELS_API_KEY } = process.env;

const capitalize = (str) => {
  return str.replace(/^(\w)(.+)/, (_match, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
}

const calculateMarkerDistance = (origin, destination) => {
  const R = 6371.0710 // Radius of earth in km
  // var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = origin.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = destination.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (destination.lng - origin.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
  return Math.ceil(d);
}

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
  origin: {},
  maxTravelDistance: 1000,
  mapZoom: 7,
  mapCenter: null,
  pointToPoint: [],

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
    case 'add_destination':
      return {
        ...states,
        chosenDestinations:  [{
          latlng: action.payload.latlng,
          city: action.payload.city,
          country: action.payload.country,
          formattedAddress: action.payload.formattedAddress,
          placeId: action.payload.placeId,
          distance: action.payload.distance,
          temperature: action.payload.temperature,
          image: action.payload.image
        }, ...states.chosenDestinations]
      }
    case 'remove_destination':
      return {
        ...states,
        chosenDestinations: states.chosenDestinations.filter(chosenDestination => chosenDestination.placeId !== action.payload.placeId),
      }
    case 'center_destination':
      return {
        ...states,
      }
    case 'map_origin_changed':
      return {
        ...states,
        origin: {
          city: action.payload.city,
          country: action.payload.country,
          latlng: action.payload.latlng,
          formattedAddress: action.payload.formattedAddress,
          placeId: action.payload.placeId
        },
        mapCenter: action.payload.latlng,
      }
    case 'map_center_changed':
      return {
        ...states,
        mapCenter: action.payload.mapCenter,
      }
    case 'map_zoomed':
      return {
        ...states,
        mapZoom: action.payload.mapZoom,
      }
    case 'set_locked_destinations':
      return {
        ...states,
        lockedDestinations: action.payload.lockedDestinations
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
  const { getLocationsInRadius } = useAmadeusApi();

  const [states, dispatch] = useReducer(reducer, initialStates)
  const [savedDestinations, setSavedDestinations] = useLocalStorage("destinations", []);

  const deviceLocation = useMemo(() => {
    return suspender.fetchCurrentLocation({ lat: 52.132633, lng: 5.2912659 });
  }, []);

  const createNewDestination = async (latlng, locationInfo) => {
    const markerDistance = calculateMarkerDistance(states.origin.latlng, latlng);
    let imageInfo, weatherInfo;

    try {
      weatherInfo = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
        params: {
          lat: latlng.lat,
          lon: latlng.lng,
          units: 'metric',
          appid: REACT_APP_OPENWEATHER_API_KEY,
        }
      });
    } catch (err) {
      console.error(err);
      toast.warn("Unable to create new destination");
    }

    try {
      imageInfo = await axios.get(`https://api.pexels.com/v1/search?orientation=landscape&query=${locationInfo.city}`, {
        headers: {
          "Authorization": REACT_APP_PEXELS_API_KEY
        }
      });
    } catch(err) {
      console.error(err);
      toast.warn("Unable to create new destination");
    }

    dispatch({
      type: 'add_destination',
      payload: {
        latlng,
        country: locationInfo.country,
        city: locationInfo.city,
        formattedAddress: locationInfo.formattedAddress,
        placeId: locationInfo.placeId,
        distance: markerDistance,
        temperature: weatherInfo.data.current.temp,
        image: imageInfo.data.photos[0].src.landscape
      }
    });
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
    if(states.chosenDestinations.length > 0) {
      states.chosenDestinations.forEach(destination => {
        if(destination.distance >= parseInt(states.maxTravelDistance) || !states.maxTravelDistance) {
          toast.warn(`${destination.formattedAddress} is not within the specified travel distance range`);
        }
      })
    }
  }, [states.chosenDestinations, states.maxTravelDistance]);

  useEffect(() => {
    const fetchLockedDestinations = async () => {
      const locations = await getLocationsInRadius(states.mapCenter);
    
      const lockedDestinations = locations.map(location => {
        let toLatLng = {
          lat: location.geoCode.latitude,
          lng: location.geoCode.longitude
        }
    
        let distance = calculateMarkerDistance(states.origin.latlng, toLatLng);
    
        return {
          latlng: toLatLng,
          formattedAddress: `${capitalize(location.address.cityName)}, ${capitalize(location.address.countryName)}`,
          outsideTravelDistance: distance > states.maxTravelDistance
        }
      });
     
      dispatch({
        type: 'set_locked_destinations',
        payload: {
          lockedDestinations,
        }
      })
    }

    if(states.maxTravelDistance && states.mapCenter) {
      fetchLockedDestinations()
        .catch(() => {
        toast.warn('unable to fetch possible destinations');
      })
    }
  }, [states.maxTravelDistance, states.mapCenter])

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
              <TravelPlanControl states={states} dispatch={dispatch} />
            </GridItem>

            <GridItem rowStart={2} columnStart={1} rowEnd={8} columnEnd={9}>
              <Suspense fallback={<Typography variant="h1">Loading Google Maps... </Typography>}>
                <TravelPlanMap dispatch={dispatch} states={states} deviceLocation={deviceLocation} createNewDestination={createNewDestination} />
              </Suspense>
            </GridItem>
          </Grid>

          {/* <TravelPlanModal chosen={states.chosen} modalRef={modalRef} saveDestination={saveDestination} handleCloseModal={handleCloseModal} /> */}
        </Container>
      </Parallax>
      <Parallax speed={30}
        translateY={['-100px', '100px', 'easeIn']}>
      <Container element="section" backgroundColor={colors.background.white.main} customStyles={{ boxShadow: "0 -5px 5px -5px #333", zIndex: "9999" }}>
        <Grid gridRows={8} gridColumns={8} rowGap={15} columnGap={15}>
          <GridItem rowStart={1} columnStart={1} rowEnd={9} columnEnd={4}>
            <Typography  variant={"h1"} customStyles={{ textAlign: 'center', marginBottom: '20px' }}>Chosen Destinations</Typography>
            <TravelPlanDestinations states={states} dispatch={dispatch} />
          </GridItem>
        </Grid>
      </Container>
      </Parallax>
    </React.Fragment>
  )
}