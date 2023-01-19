import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import { DestinationMarker, OriginMarker } from '../../components/GoogleMaps/Marker';
import Box from '../../components/Box/Box';

import useGoogleApi from '../../hooks/useGoogleApi';
import useAmadeusApi from '../../hooks/useAmadeusApi';
import mapStyles from '../../helpers/mapStyles';

const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

export default function TravelPlanMap(props) {
  let location = props.deviceLocation.read();

  const { api, placesService } = useGoogleApi();
  const { amadeusApi } = useAmadeusApi();
  // const amadeusApi = useAmadeusApi();

  const [mapZoom, setMapZoom] = useState(7);
  const [mapCenter, setMapCenter] = useState(location);

  const onMapsLoaded = async () => {
    const latlng = api.map.getCenter().toJSON();

    try {
      let locationInfo = await api.getGeocodedAddress(latlng);

      console.log(locationInfo)

      props.setOrigin({
        latlng,
        ...locationInfo,
      });

      props.setPlaceOrigin(locationInfo.formattedAddress);
    } catch (err) {
      props.showWarning("Unable to fetch location")
    }

    try {
      const lockedLocations = await amadeusApi.getLocationsInRadius();
      console.log(lockedLocations);

      // const result = lockedLocations.map(location => ({ latlng: {
      //   lat: location.geoCode.latitude,
      //   lng: location.geoCode.longitude
      // }}));

      props.setDestinations(lockedLocations.map(location => ({ latlng: {
        lat: location.geoCode.latitude,
        lng: location.geoCode.longitude
      }})));

      // let latlng = {
      //   lat: lockedLocations[0].geoCode.latitude,
      //   lng: lockedLocations[0].geoCode.longitude,
      // }
      // console.log(result);

      // let formattedAddress = `${lockedLocations[0].address.cityName}, ${lockedLocations[0].address.countryName}`;

      // let request = {
      //   query: formattedAddress,
      //   fields: ['name', 'formatted_address', 'place_id', 'geometry']
      // }

      // placesService.findPlaceFromQuery(request, (results, status) => {
      //   if(status === "OK") {
      //     console.log(results);
      //   }
      // });

      // // const li = await api.getGeocodedAddress(latlng);

      // // console.log(lockedLocations[0]);
      // // console.log(li)
      // console.log(formattedAddress);

    } catch(err) {
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
    return d.toFixed(2);
  }

  const createNewDestination = async (latlng, locationInfo) => {

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

      props.setDestinations([...props.destinations, {
        latlng,
        ...locationInfo,
        distance: markerDistance,
        temperature: weatherInfo.data.current.temp,
      }]);
    } catch (err) {
      props.showWarning("Unable to create new destination");
    }
  }

  const onClick = async (e) => {
    toast.info('Creating destination...', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000
    });

    const latlng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    try {
      const locationInfo = await api.getGeocodedAddress(latlng);

      if(Object.keys(locationInfo).length === 0) {
        throw "Unable to fetch location";
      }

      if (props.destinations.some(destination => destination.placeId === locationInfo.placeId)) {
        props.showWarning(`${locationInfo.formattedAddress} is already present in the list`)
      } else {
        createNewDestination(latlng, locationInfo);
      }

    } catch (err) {
      props.showWarning(err)
    }
  }

  const onZoomChange = () => {
    setMapZoom(api.map.getZoom());
  }

  const onIdle = async () => {
    setMapCenter(api.map.getCenter().toJSON());

    console.log('hello')

    try {
      const locationInfo = await api.getGeocodedAddress(api.map.getCenter().toJSON());


      props.setPlaceCenter(locationInfo.formattedAddress ?? "");
    } catch (err) {
      props.showWarning(err);
    }
  }

  const onOriginDragend = async (e) => {
    const latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    try {
      const locationInfo = await api.getGeocodedAddress(latlng);
      props.setOrigin({
        latlng,
        ...locationInfo
      });

      props.setPlaceOrigin(locationInfo.formattedAddress)
    } catch (err) {
      props.showWarning(err);
    }
  }

  return (
    <Box borderRadius={5}>
      <GoogleMaps
        onClick={onClick}
        onZoomChange={onZoomChange}
        onMapsLoaded={onMapsLoaded}
        onIdle={onIdle}
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
        <OriginMarker onDragend={onOriginDragend} marker={props.origin} />
        {props.destinations.map((destination, i) => (
          <DestinationMarker marker={destination} key={i} />
        ))}
      </GoogleMaps>
    </Box>
  )
}