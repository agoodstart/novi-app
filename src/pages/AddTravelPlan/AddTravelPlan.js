import React, { Suspense, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import GoogleApiWrapper from '../../components/GoogleMaps/GoogleApiWrapper';
import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import Marker from '../../components/GoogleMaps/Marker';
import GooglePlaces from '../../components/GoogleMaps/GooglePlaces';

export default function AddTravelPlan() {
  const [markers, setMarkers] = useState([]);
  const user = useOutletContext();

  const placeMarker = (e, getReadableAddress) => {
    setMarkers([...markers, e.latLng]);
  }

  const onIdle = (map) => {
    console.log("onIdle");
    console.log(map.getCenter().toJSON());
  };

  const onPlaceChange = (autocomplete) => {
    const place = autocomplete.getPlace();

    console.log(place.geometry.location.lat());
  }


  return (
    <GoogleApiWrapper>
      <GooglePlaces onPlaceChange={onPlaceChange} />
      <Suspense fallback={<p>Loading Google Maps....</p>}>
        <GoogleMaps
          onClick={placeMarker}
          onIdle={onIdle}
          >
          {markers.length && markers.map((marker, i) => (
            <Marker key={i} position={marker} />
          ))}
        </GoogleMaps>
      </Suspense>
    </GoogleApiWrapper>
  );
}