import React, { Suspense, useEffect, useState } from 'react';

import useGoogleApi from '../../hooks/useGoogleApi';
import useLocalStorage from '../../hooks/useLocalStorage';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

export default function TravelPlanMap() {
  const { api } = useGoogleApi();

  const [origin, setOrigin] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [destinationDragged, setDestinationDragged] = useState(null);

  const [mapZoom, setMapZoom] = useState(8);
  const [mapCenter, setMapCenter] = useState();

  const onMapsLoaded = () => {
    const latlng = api.map.getCenter().toJSON();

    api.getGeocodedAddress(latlng)
      .then(locationInfo => {
        // console.log(result);
        setOrigin({
          latlng,
          ...locationInfo,
        });

        setPlaceOrigin(locationInfo.formattedAddress)
      }, err => {
        console.log(err)
      })
  }

  const onClick = (e) => {
    const latlng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    api.getGeocodedAddress(latlng)
    .then(locationInfo => {
      if (destinations.some(destination => destination.placeId === locationInfo.placeId)) {
        showWarning(`${locationInfo.formattedAddress} is already present in the list`)
      } else {
        setDestinations([...destinations, {
          latlng,
          ...locationInfo,
          distance: 0,
          temperature: '',
        }])
      }
    }, err => {
      console.log(err)
    })
  }

  const onZoomChange = () => {
    setMapZoom(api.map.getZoom());
  }

  const onIdle = () => {
    setMapCenter(api.map.getCenter().toJSON());

    api.getGeocodedAddress(api.map.getCenter().toJSON())
    .then(locationInfo => {
      setPlaceCenter(locationInfo.formattedAddress);
    }, err => {
      console.log(err)
    })
  }

  

  return (
    <Suspense fallback={<p>Loading Google Maps....</p>}>
      <GoogleMaps
      onClick={onClick}
      onZoomChange={onZoomChange}
      onMapsLoaded={onMapsLoaded}
      onIdle={onIdle}
      zoom={mapZoom}
      disableDefaultUI={true}
      zoomControl={true}
      defaultCenter={mapCenter}
      customClassname={styles['travelplan__maps']}
    >
      <OriginMarker onDragend={onOriginDragend} marker={origin} />
      {destinations.map((destination, i) => (
        <DestinationMarker onDragend={onDestinationDragend} marker={destination} key={i} />
      ))}
    </GoogleMaps>
  </Suspense>
  )
}