import React, { Suspense, useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import Marker from '../../components/GoogleMaps/Marker';
import GooglePlaces from '../../components/GoogleMaps/GooglePlaces';
import useGoogleApi from '../../hooks/useGoogleApi';

export default function AddTravelPlan() {
  const { api, geocoder } = useGoogleApi();
  const [currentAddress, setCurrentAddress] = useState("")
  const [mapZoom, setMapZoom] = useState(11)
  const [markers, setMarkers] = useState([]);
  const user = useOutletContext();

  const onClick = (e) => {
    setMarkers([...markers, e.latLng]);

    geocoder
    .geocode({ location: e.latLng }, (results, status) => {
      if (status == 'OK') {
        const [formattedAddr] = results.filter(component => component.types.includes('locality'));
        console.log(formattedAddr.formatted_address);
      } else {
        alert('Geocode was not successfull: ', status)
      }
    })
  }

  const onIdle = () => {
    console.log(api.getMap().getCenter().toJSON())

    geocoder
      .geocode({ location: api.getMap().getCenter().toJSON() }, (results, status) => {
        if (status == 'OK') {
          const [formattedAddr] = results.filter(component => component.types.includes('locality'));
          setCurrentAddress(formattedAddr.formatted_address);
        } else {
          alert('Geocode was not successfull: ', status)
        }
      })
  };

  const onZoomChange = () => {
    api.getMap().setZoom(api.getMap().getZoom())
    // console.log(map.getZoom());
    // setZoom(map.getZoom());
  }

  const onMouseMove = (mouseEvent) => {
    // console.log('mouse moving');
    // console.log(mouseEvent);
  }

  const onPlaceChange = (autocomplete) => {
    const place = autocomplete.getPlace();

    api.getMap().panTo({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
  }


  return (
    <React.Fragment>
      <GooglePlaces onPlaceChange={onPlaceChange} setDefaultValue={currentAddress} />
      <Suspense fallback={<p>Loading Google Maps....</p>}>
        <GoogleMaps
          onClick={onClick}
          onIdle={onIdle}
          // onZoomChange={onZoomChange}
          // disableDefaultUI={true}
          // zoom={mapZoom}
          >
          {markers.length && markers.map((marker, i) => (
            <Marker key={i} position={marker} />
          ))}
        </GoogleMaps>
      </Suspense>
    </React.Fragment>
  );
}