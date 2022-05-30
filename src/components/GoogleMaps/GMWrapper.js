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
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [zoom, setZoom] = useState(13)
  const [markers, setMarkers] = useState([]);

  const onClick = (e) => {
    setMarkers([...markers, e.latLng]);
  }

  const onIdle = (map) => {
    console.log("onIdle");
    setZoom(map.getZoom());
    setCenter(map.getCenter().toJSON());
  };

  const onZoomChanged = (v) => {
    console.log('zoom changed')
  }

  useEffect(() => {
    getDeviceLocation().then(data => setCenter(data))
  }, [])

  return (
    <Wrapper apiKey={REACT_APP_GOOGLE_MAPS_API_KEY} render={render} >
      <ActualMap
        onZoomChanged={onZoomChanged}
        onIdle={onIdle}
        onClick={onClick}
        disableDefaultUI={true}
        zoom={zoom}
        center={center}
      >
        {markers.length && markers.map((marker, i) => (
          <NewMarker key={i} position={marker} />
        ))}
      </ActualMap>
    </Wrapper>
  )
}