import React, { Suspense, useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import Marker from '../../components/GoogleMaps/Marker';
import GooglePlaces from '../../components/GoogleMaps/GooglePlaces';
import { List, ListItem } from '../../components/List/List';

import useGoogleApi from '../../hooks/useGoogleApi';

export default function AddTravelPlan() {
  const { api } = useGoogleApi();
  const [currentAddress, setCurrentAddress] = useState("")
  const [locations, setLocations] = useState([])
  const [mapZoom, setMapZoom] = useState(11)
  const user = useOutletContext();

  const getGeocodedAddress = (latlng) => {
    return api.geocoder
      .geocode({ location: latlng }, (results, status) => {
        if (status == 'OK') {
          const [formattedAddr] = results.filter(component => component.types.includes('locality'));
          console.log(formattedAddr);
          return formattedAddr.formatted_address;
        } else {
          alert('Geocode was not successfull: ', status)
        }
      }).then(result => {
        console.log(result);
      })
  }

  const onMapsLoaded = () => {
    const latlng = api.map.getCenter().toJSON();

    api.geocoder
      .geocode({ location: latlng }, (results, status) => {
        if (status == 'OK') {
          const [formattedAddr] = results.filter(component => component.types.includes('locality'));
          setLocations([{
            latlng,
            addr: formattedAddr.formatted_address,
          }])
          setCurrentAddress(formattedAddr.formatted_address)

        } else {
          alert('Geocode was not successfull: ', status)
        }
      })
  }
  
  const onClick = (e) => {
    const latlng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    api.geocoder
      .geocode({ location: latlng }, (results, status) => {
        if (status == 'OK') {
          const [formattedAddr] = results.filter(component => component.types.includes('locality'));
          setLocations([...locations, {
            latlng,
            addr: formattedAddr.formatted_address,
          }])

        } else {
          alert('Geocode was not successfull: ', status)
        }
      })
  }

  const onZoomChange = () => {
    setMapZoom(api.map.getZoom());
  }

  const onPlaceChange = () => {
    const place = api.autocomplete.getPlace();

    api.map.panTo({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
  }

  useEffect(() => {
    console.log(locations);
  }, [locations])

  return (
    <React.Fragment>
      <GooglePlaces onPlaceChange={onPlaceChange} setDefaultValue={currentAddress} />
      <Suspense fallback={<p>Loading Google Maps....</p>}>
        <GoogleMaps
          onClick={onClick}
          onZoomChange={onZoomChange}
          onMapsLoaded={onMapsLoaded}
          zoom={mapZoom}
          disableDefaultUI={true}
          zoomControl={true}
          >
          {locations.length && locations.map((location, i) => (
            <Marker key={i} position={location.latlng} />
          ))}
        </GoogleMaps>
      </Suspense>

      <List customStyles={{
        gridArea: '2 / 5 / 5 / 7',
      }}>
        {locations.length && locations.map((location, i) => (
          <ListItem key={i}>
            {location.addr}
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}