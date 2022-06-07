import { useEffect, useState, useMemo } from "react";
import useLocation from "../../hooks/useLocation";
import { Wrapper } from "@googlemaps/react-wrapper";
import Map from "./Map";
import Marker from "./Marker";

const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

const render = (status) => {
    switch (status) {
      case 'LOADING':
        return 'loading...';
      case 'FAILURE':
        return 'error!';
      case 'SUCCESS':  
        return 'success!';
    }
}

export default function GoogleMaps({defaultCenter}) {
  const location = useLocation();
  const netherlands = { lat: 52.132633, lng: 5.2912659}

  const currentCenter = useMemo(() => {
    if(defaultCenter) {
      return defaultCenter;
    }

    let deviceLocation = location.getDeviceLocation();

    if(deviceLocation) {
      return deviceLocation
    } else {
      return netherlands
    }
  }, [])
  
  const [center, setCenter] = useState(currentCenter)
  const [zoom, setZoom] = useState(11)
  const [markers, setMarkers] = useState([]);

  const onClick = (e) => {
    setMarkers([...markers, e.latLng]);
    
    location.getGeocodedAddress(e.latLng.lat(), e.latLng.lng(), 0, ["locality", "country"]);
  }

  const onIdle = (map) => {
    console.log("onIdle");
    setCenter(map.getCenter().toJSON());
  };

  const onZoomChange = (map) => {
    console.log(map.getZoom());
    setZoom(map.getZoom());
  }

  const onMouseMove = (mouseEvent) => {
    // console.log('mouse moving');
    // console.log(mouseEvent);
  }

  useEffect(() => {
    location.getGeocodedAddress(currentCenter.lat, currentCenter.lng, 0, ["locality", "country"]);
  }, [])

  return (
    <Wrapper apiKey={REACT_APP_GOOGLE_MAPS_API_KEY} render={render} >
      <Map
      onZoomChange={onZoomChange}
      onMouseMove={onMouseMove}
      onIdle={onIdle}
      onClick={onClick}
      disableDefaultUI={true}
      zoom={zoom}
      center={center}
      zoomControl={true}
      >
        {markers.length && markers.map((marker, i) => (
          <Marker key={i} position={marker} />
        ))}
      </Map>
    </Wrapper>
  )
}