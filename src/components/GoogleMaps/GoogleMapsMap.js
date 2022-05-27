import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useAsync } from 'react-async';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';
import Marker from './Marker';
import styles from './Map.module.scss';

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const getDeviceLocation = async () => {
  let coord = new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        return res({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      },
      error => rej(error)
    )
  })

  return coord;
}

const getCurrentCountry = (lat, lng) => {
  const searchParams = new URLSearchParams({
    latlng: `${lat},${lng}`,
    key: REACT_APP_GOOGLE_MAPS_API_KEY
  })
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?${searchParams}`).then(
    response => {
      return response.data.results
    }
  ).then(results => {
    console.log(results[results.length - 1].formatted_address);
  })
}

const calculateMarkerDistance = (mk1, mk2) => {
  // I didn't calc this myself lol
  // https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
  const R = 6371.0710 // Radius of earth in km
  // var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.lat * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng-mk1.lng) * (Math.PI/180); // Radian difference (longitudes)

  // idk wtf this calculation is but whatever
  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}

const EmbeddedMap = ({defaultCenter}) => {
  const [markers, setMarkers] = useState([]);

  const onMapClick = (marker) => {
    getCurrentCountry(marker.lat, marker.lng)
    let newList = [...markers];
    newList.push({
      lat: marker.lat,
      lng: marker.lng,
    })
    setMarkers(newList);
  }

  useEffect(() => {
    if(markers.length > 1) {
      let km = calculateMarkerDistance(markers[0], markers[1]);

      console.log('distance of markers in KM: ', km.toFixed(2));
    }
  }, [markers])

  const onChildClick = (index, coords) => {
    return;
  }

  return (
    <div className={styles['mapContainer']}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultCenter}
        center={defaultCenter}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        yesIWantToUseGoogleMapApiInternals
        // options={''}
        // onChange={''}

        onChildClick={onChildClick}
        onClick={onMapClick}
        >
          {markers.length && markers.map((marker, i) => (
            <Marker lat={marker.lat} lng={marker.lng} key={i}  />
          ))}
      </GoogleMapReact>
    </div>
  )
}

const GoogleMapsMap = () => {
  const { data, error, isPending } = useAsync({ promiseFn: getDeviceLocation });
  if (isPending) return 'loading...';
  if (error) return 'something went wrong';
  if (data) return <EmbeddedMap defaultCenter={data} />
}

export default GoogleMapsMap;