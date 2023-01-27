import axios from 'axios';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import { DestinationMarker, OriginMarker } from '../../components/GoogleMaps/Marker';
import Box from '../../components/Box/Box';

import useGoogleApi from '../../hooks/useGoogleApi';
import useAmadeusApi from '../../hooks/useAmadeusApi';
import mapStyles from '../../helpers/mapStyles';

import { DistanceLine } from '../../components/GoogleMaps/DistanceLine';
import Typography from '../../components/Typography/Typography';

const { REACT_APP_OPENWEATHER_API_KEY, REACT_APP_PEXELS_API_KEY } = process.env;

export default function TravelPlanMap({
  states,
  dispatch,
  deviceLocation,
  calculateMarkerDistance,
  showWarning
}) {
  const userLocation = useMemo(() => {
    return deviceLocation.read();
  }, []);

  const 
  { 
    placesService, 
    map, 
    getGeocodedAddress 
  } = useGoogleApi();
  const { getLocationsInRadius } = useAmadeusApi();

  const [pointToPoint, setPointToPoint] = useState(null);

  const capitalize = (str) => {
    return str.replace(/^(\w)(.+)/, (_match, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
  }

  const beforeMapsLoad = useCallback(async (userLocation) => {
    try {
      const locationInfo = await getGeocodedAddress(userLocation);
      const lockedLocations = await getLocationsInRadius(userLocation.lat, userLocation.lng);
      
      const newLocations = lockedLocations.map(location => {
        let latlng = {
          lat: location.geoCode.latitude,
          lng: location.geoCode.longitude
        }

        let distance = calculateMarkerDistance(userLocation, latlng);

        return {
          latlng,
          formattedAddress: `${capitalize(location.address.cityName)}, ${capitalize(location.address.countryName)}`,
          outsideTravelDistance: distance > states.maxTravelDistance
        }
      });

      dispatch({
        type: 'map_origin_changed',
        payload: {
          formattedAddress: locationInfo.formattedAddress ?? "",
          city: locationInfo.city,
          country: locationInfo.country,
          latlng: userLocation,
          placeId: locationInfo.placeId,
          lockedDestinations: newLocations
        },
      });

    } catch(err) {
      console.log(err);
      showWarning("Unable to fetch location")
    }
  }, [])

  useEffect(() => {
    beforeMapsLoad(userLocation);
  }, [beforeMapsLoad]);

  const createNewDestination = async (latlng, locationInfo) => {
    const markerDistance = calculateMarkerDistance(states.origin.latlng, latlng);

    dispatch({
      type: 'add_destination',
      payload: {
        latlng,
        country: locationInfo.country,
        city: locationInfo.city,
        formattedAddress: locationInfo.formattedAddress,
        placeId: locationInfo.placeId,
        distance: markerDistance,
        // temperature: weatherInfo.data.current.temp
      }
    });

    // console.log(locationInfo);
    // try {
    //   const weatherInfo = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
    //     params: {
    //       lat: latlng.lat,
    //       lon: latlng.lng,
    //       units: 'metric',
    //       appid: REACT_APP_OPENWEATHER_API_KEY,
    //     }
    //   });

    //   console.log(locationInfo.city);


    //   const image = await axios.get(`https://api.pexels.com/v1/search?orientation=landscape&query=${locationInfo.city}`, {
    //     headers: {
    //       "Authorization": REACT_APP_PEXELS_API_KEY
    //     }
    //   });
    //   console.log(image);

    //   const markerDistance = calculateMarkerDistance(states.origin.latlng, latlng);

    //   dispatch({
    //     type: 'add_destination',
    //     payload: {
    //       latlng,
    //       country: locationInfo.country,
    //       city: locationInfo.city,
    //       formattedAddress: locationInfo.formattedAddress,
    //       placeId: locationInfo.placeId,
    //       distance: markerDistance,
    //       temperature: weatherInfo.data.current.temp
    //     }
    //   });
    // } catch (err) {
    //   console.error(err);
    //   showWarning("Unable to create new destination");
    // }
  }

  const onMarkerClick = async (destination) => {
    let request = {
      query: destination.formattedAddress,
      fields: ['name', 'formatted_address', 'geometry', 'place_id', 'plus_code', 'types']
    }

    placesService.findPlaceFromQuery(request, (results, status) => {
      if (status === "OK") {
        let latlng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }

        let [city, country] = results[0].formatted_address.split(", ");
        let formattedAddress = results[0].formatted_address;
        let placeId = results[0].place_id;

        if (states.chosenDestinations.some(destination => destination.placeId === placeId)) {
          showWarning(`${formattedAddress} is already present in the list`)
        } else {
          createNewDestination(latlng, {
            country,
            city,
            formattedAddress,
            placeId
          });
        }
      } else {
        showWarning("Unable to get location");
      }
    });

    setPointToPoint([destination.latlng, states.origin.latlng]);
  }

  const onZoomChange = () => {
    dispatch({
      type: 'map_zoomed',
      payload: {
        mapZoom: map.getZoom(),
      }
    })
  }

  const onDragEnd = async () => {
    const latlng = map.getCenter().toJSON();

    try {
      const locationInfo = await getGeocodedAddress(latlng);
      const lockedLocations = await getLocationsInRadius(latlng.lat, latlng.lng);

      const newLocations = lockedLocations.map(location => {
        let latlng = {
          lat: location.geoCode.latitude,
          lng: location.geoCode.longitude
        }

        let distance = calculateMarkerDistance(states.origin.latlng, latlng);

        return {
          latlng,
          formattedAddress: `${capitalize(location.address.cityName)}, ${capitalize(location.address.countryName)}`,
          outsideTravelDistance: distance > states.maxTravelDistance
        }
      });

      dispatch({
        type: 'map_center_changed',
        payload: {
          mapCenter: latlng,
          formattedAddress: locationInfo.formattedAddress ?? "",
          lockedDestinations: newLocations,
        }
      })
    } catch (err) {
      showWarning(err);
    }
  }

  return (
    <Box borderRadius={5}>
      {Object.keys(states.origin).length !== 0 ? <GoogleMaps
        onDragend={onDragEnd}
        onZoomChange={onZoomChange}
        zoom={states.mapZoom}
        disableDefaultUI={true}
        zoomControl={true}
        scrollwheel={false}
        zoomControlOptions={{
          style: google.maps.ZoomControlStyle.SMALL
        }}
        defaultCenter={states.mapCenter}
        styles={mapStyles}
      >
        <OriginMarker location={states.origin} />
        {states.lockedDestinations.map((destination, i) => (
          <DestinationMarker onClick={onMarkerClick} location={destination} key={i} />
        ))}
        {pointToPoint ? <DistanceLine pointToPoint={pointToPoint} /> : null}
      </GoogleMaps> : <Typography>Setting origin data...</Typography>}
    </Box>
  )
}