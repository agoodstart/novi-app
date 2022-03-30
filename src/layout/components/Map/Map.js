import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useAsync } from 'react-async';
import Marker from './Marker';
import styles from './Map.module.scss';

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const getDeviceLocation = async () => {
  let coord = new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        let encoded = encodeURIComponent(`${pos.coords.latitude},${pos.coords.longitude}`);
        console.log(encoded);
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

const EmbeddedMap = ({defaultCenter}) => {
  const [markers, setMarkers] = useState([]);

  const onMapClick = (marker) => {
    console.log(marker);
    let newList = [...markers];
    newList.push({
      lat: marker.lat,
      lng: marker.lng,
    })
    setMarkers(newList);
  }

  useEffect(() => {

  })

  useEffect(() => {
    console.log(markers)
  }, [markers])


  return (
    <div className={styles['mapContainer']}>
      <GoogleMapReact 
        bootstrapURLKeys={{ key: REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultCenter}
        center={defaultCenter}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        // options={''}
        // onChange={''}

        // onChildClick={''}
        onClick={onMapClick}
        >
          {markers.length && markers.map((marker, i) => (
            <Marker lat={marker.lat} lng={marker.lng} key={i} />
          ))}
      </GoogleMapReact>
    </div>
  )
}

const Map = () => {
  const { data, error, isPending } = useAsync({ promiseFn: getDeviceLocation });
  if (isPending) return 'loading...';
  if (error) return 'something went wrong';
  if (data) return <EmbeddedMap defaultCenter={data} />
}

export default Map;

// export default function EmbeddedMap() {
//   console.log(REACT_APP_GOOGLE_MAPS_API_KEY)

//   const customStyle = {
//     border: '0',
//   }

//   return (
//     <iframe
//     width="450"
//     height="250"
//     frameBorder="0" style={customStyle}
//     referrerPolicy="no-referrer-when-downgrade"
//     src={`https://www.google.com/maps/embed/v1/place?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&q=Space+Needle,Seattle+WA`}
//     allowFullScreen>
//   </iframe>
//   )
// }