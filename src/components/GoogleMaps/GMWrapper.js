import { useEffect, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import ActualMap from "./ActualMap";
import NewMarker from "./NewMarker";

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const render = (status) => {
  console.log(typeof status);
    switch (status) {
      case status.LOADING:
        return 'loading...';
      case status.FAILURE:
        return 'error!';
      case status.SUCCESS:  
        return 'success!';
    }
}

const getDeviceLocation = () => {
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


export default function GMWrapper() {
  const [initialCenter, setInitialCenter] = useState({ lat: 0, lng: 0 })
  const [markers, setMarkers] = useState([]);

  const onClick = (e) => {
    setMarkers([...markers, e.latLng]);
  }

  useEffect(() => {
    getDeviceLocation().then(data => setInitialCenter(data))
  }, [])

  return (
    <Wrapper apiKey={REACT_APP_GOOGLE_MAPS_API_KEY} render={render} >
      <ActualMap
        onClick={onClick}
        disableDefaultUI={true}
        zoom={13}
        center={initialCenter}
      >
        {markers.length && markers.map((marker, i) => (
          <NewMarker key={i} position={marker} />
        ))}
      </ActualMap>
    </Wrapper>
  )
}