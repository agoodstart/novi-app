import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import { DestinationMarker, OriginMarker } from '../../components/GoogleMaps/Marker';
import Box from '../../components/Box/Box';

import useGoogleApi from '../../hooks/useGoogleApi';
import useAmadeusApi from '../../hooks/useAmadeusApi';
import mapStyles from '../../helpers/mapStyles';

import { DistanceLine } from '../../components/GoogleMaps/DistanceLine';

const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

export default function TravelPlanMap(props) {
  let location = props.deviceLocation.read();

  const { api, placesService, map } = useGoogleApi();
  const { amadeusApi } = useAmadeusApi();

  const [mapZoom, setMapZoom] = useState(7);
  const [mapCenter, setMapCenter] = useState(location);
  const [pointToPoint, setPointToPoint] = useState(null);

  const capitalize = (str) => {
    return str.replace(/^(\w)(.+)/, (_match, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
  }

  const onMapsLoaded = async () => {
    const latlng = api.map.getCenter().toJSON();

    try {
      let locationInfo = await api.getGeocodedAddress(latlng);
      props.setPlaceCenter(locationInfo.formattedAddress ?? "");

      props.setOrigin({
        latlng,
        ...locationInfo,
      });

      props.setPlaceOrigin(locationInfo.formattedAddress);
    } catch (err) {
      props.showWarning("Unable to fetch location")
    }

    try {
      const lockedLocations = await amadeusApi.getLocationsInRadius(latlng.lat, latlng.lng);

      const newLocations = lockedLocations.map(location => ({
        latlng: {
          lat: location.geoCode.latitude,
          lng: location.geoCode.longitude
        },
        // Better formatted city and countrynames
        formattedAddress: `${capitalize(location.address.cityName)}, ${capitalize(location.address.countryName)}`,
        outsideTravelDistance: location.distance.value > props.maxTravelDistance
      }));
      props.setDestinations(newLocations);

    } catch (err) {
      props.showWarning(err);
    }
  }

  const calculateMarkerDistance = (latlng) => {
    const R = 6371.0710 // Radius of earth in km
    // var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = props.origin.latlng.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = latlng.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (latlng.lng - props.origin.latlng.lng) * (Math.PI / 180); // Radian difference (longitudes)

    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat / 2) * Math.sin(difflat / 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.sin(difflon / 2) * Math.sin(difflon / 2)));
    return Math.ceil(d);
  }

  const createNewDestination = async (latlng, locationInfo) => {
    console.log(latlng);
    console.log(locationInfo);

    try {
      const weatherInfo = await axios.get('https://api.openweathermap.org/data/3.0/onecall', {
        params: {
          lat: latlng.lat,
          lon: latlng.lng,
          units: 'metric',
          appid: REACT_APP_OPENWEATHER_API_KEY,
        }
      });

      const markerDistance = calculateMarkerDistance(latlng);
      console.log(props.chosenDestinations)

      props.setChosenDestinations([...props.chosenDestinations, {
        latlng,
        ...locationInfo,
        distance: markerDistance,
        temperature: weatherInfo.data.current.temp,
      }]);
    } catch (err) {
      console.error(err);
      props.showWarning("Unable to create new destination");
    }
  }

  const onMarkerClick = async (destination, marker) => {
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

        if (props.chosenDestinations.some(destination => destination.placeId === placeId)) {
          props.showWarning(`${locationInfo.formattedAddress} is already present in the list`)
        } else {
          createNewDestination(latlng, {
            country,
            city,
            formattedAddress,
            placeId
          });
        }
      } else {
        props.showWarning("Unable to get location");
      }
    });

    setPointToPoint([destination.latlng, props.origin.latlng]);
  }

  const onZoomChange = () => {
    setMapZoom(api.map.getZoom());
  }

  const onDragEnd = async () => {
    const latlng = api.map.getCenter().toJSON();
    setMapCenter(latlng);

    try {
      const locationInfo = await api.getGeocodedAddress(latlng);
      props.setPlaceCenter(locationInfo.formattedAddress ?? "");

      const lockedLocations = await amadeusApi.getLocationsInRadius(latlng.lat, latlng.lng);

      // const existingLocations = props.destinations;
      const newLocations = lockedLocations.map(location => {
        let latlng = {
          lat: location.geoCode.latitude,
          lng: location.geoCode.longitude
        }

        let distance = calculateMarkerDistance(latlng);

        return {
          latlng,
          formattedAddress: `${capitalize(location.address.cityName)}, ${capitalize(location.address.countryName)}`,
          outsideTravelDistance: distance > props.maxTravelDistance
        }
      });

      props.setDestinations(newLocations);
    } catch (err) {
      props.showWarning(err);
    }
  }

  return (
    <Box borderRadius={5}>
      <GoogleMaps
        onDragend={onDragEnd}
        onZoomChange={onZoomChange}
        onMapsLoaded={onMapsLoaded}
        zoom={mapZoom}
        disableDefaultUI={true}
        zoomControl={true}
        scrollwheel={false}
        zoomControlOptions={{
          style: google.maps.ZoomControlStyle.SMALL
        }}
        defaultCenter={mapCenter}
        styles={mapStyles}
      >
        <OriginMarker location={props.origin} />
        {props.destinations.map((destination, i) => (
          <DestinationMarker onClick={onMarkerClick} location={destination} key={i} />
        ))}
        {pointToPoint ? <DistanceLine pointToPoint={pointToPoint} /> : null}
      </GoogleMaps>
    </Box>
  )
}