import axios from 'axios';
import React, { Suspense, useEffect, useState, useMemo } from 'react';

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import { DestinationMarker, OriginMarker } from '../../components/GoogleMaps/Marker';
import Box from '../../components/Box/Box';

import useGoogleApi from '../../hooks/useGoogleApi';

const { REACT_APP_OPENWEATHER_API_KEY } = process.env;

const fetchCurrentLocation = () => {
  let status = 'pending';
  let response;

  const suspender = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        return resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      },
      error => reject(error)
    )
  })
  .then(
    (res) => {  
      setTimeout(() => {
        status = 'success';
        response = res;
      })
    },
    (err) => {
      status = 'error';
      console.log('error');
      response = err;
    })

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        throw response;
      default:
        return response;
    }
  }

  return { read }
}


export default function TravelPlanMap(props) {
  useEffect(() => {
    window.onerror = (e) => {
      try {
        console.log('catching error')
      } catch(e) {
        console.log(e);
      }
      // if(e) {
      //   console.log('geolocationerror');
      // }

      return true;
    }
  }, [])

  const currentLocation = useMemo(() => {
    try {
      return fetchCurrentLocation();
    } catch(e) {
      console.log("ERROR");

      return { lat: 52.132633, lng: 5.2912659 };
    }
  }, []);
  const { api } = useGoogleApi();

  const [mapZoom, setMapZoom] = useState(8);
  const [mapCenter, setMapCenter] = useState();

  const onMapsLoaded = () => {
    const latlng = api.map.getCenter().toJSON();

    api.getGeocodedAddress(latlng)
      .then(locationInfo => {
        // console.log(result);
        props.setOrigin({
          latlng,
          ...locationInfo,
        });

        props.setPlaceOrigin(locationInfo.formattedAddress)
      }, err => {
        console.log(err)
      })
  }

  const calculateMarkerDistance = (latlng) => {
    const R = 6371.0710 // Radius of earth in km
    // var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = props.origin.latlng.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = latlng.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (latlng.lng-props.origin.latlng.lng) * (Math.PI/180); // Radian difference (longitudes)
  
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d.toFixed(2);
  }

  const createNewDestination = (latlng, locationInfo) => {
    setTimeout(() => {
      axios.get('https://api.openweathermap.org/data/3.0/onecall', {
        params: {
          lat: latlng.lat,
          lon: latlng.lng,
          units: 'metric',
          appid: REACT_APP_OPENWEATHER_API_KEY,
        }
      }).then(result => {
        const markerDistance = calculateMarkerDistance(latlng);
        props.setDestinations([...props.destinations, {
          latlng,
          ...locationInfo,
          distance: markerDistance,
          temperature: result.data.current.temp,
        }]);
      }).catch(e => {
        console.log('error')
      })
    }, 200);
  }

  const onClick = (e) => {
    const latlng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    api.getGeocodedAddress(latlng)
    .then(locationInfo => {
      if (props.destinations.some(destination => destination.placeId === locationInfo.placeId)) {
        props.showWarning(`${locationInfo.formattedAddress} is already present in the list`)
      } else {
        createNewDestination(latlng, locationInfo);
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
      props.setPlaceCenter(locationInfo.formattedAddress);
    }, err => {
      console.log(err)
    })
  }

  function onOriginDragend(e) {
    const latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    api.getGeocodedAddress(latlng)
    .then(locationInfo => {
      props.setOrigin({
        latlng,
        ...locationInfo
      });

      props.setPlaceOrigin(locationInfo.formattedAddress)
    }, err => {
      console.log(err)
    })
  }

  return (
    <Box elevation={1} borderRadius={10}>
      <Suspense fallback={<p>Loading Google Maps....</p>}>
        <GoogleMaps
        onClick={onClick}
        onZoomChange={onZoomChange}
        onMapsLoaded={onMapsLoaded}
        onIdle={onIdle}
        zoom={mapZoom}
        disableDefaultUI={true}
        zoomControl={true}
        defaultCenter={currentLocation}
        >
          <OriginMarker onDragend={onOriginDragend} marker={props.origin} />
          {props.destinations.map((destination, i) => (
            <DestinationMarker marker={destination} key={i} />
          ))}
        </GoogleMaps>
      </Suspense>
    </Box>
  )
}