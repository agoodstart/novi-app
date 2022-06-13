import React, { Suspense, useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import Marker from '../../components/GoogleMaps/Marker';
import GooglePlaces from '../../components/GoogleMaps/GooglePlaces';
import { List, ListItem } from '../../components/List/List';
import Location from '../../components/Location/Location';

import styles from './AddTravelPlan.module.scss';
import useGoogleApi from '../../hooks/useGoogleApi';

export default function AddTravelPlan() {
  const { api } = useGoogleApi();
  const [currentAddress, setCurrentAddress] = useState("")
  const [locations, setLocations] = useState([])
  const [mapZoom, setMapZoom] = useState(11)
  const user = useOutletContext();

  const getGeocodedAddress = (latlng) => {
    return new Promise((resolve, reject) => {
      api.geocoder
        .geocode({ location: latlng }, (results, status) => {
          if (status == 'OK') {
            resolve(results);
          } else {
            reject(status)
          }
        })
    }).then(results => {
        const [formattedAddr] = results.filter(component => component.types.includes('locality'));

        if(!formattedAddr) {
          return Promise.reject('cannot resolve address')
        } else {
          return Promise.resolve(formattedAddr)
        }
      },
      err => {
        console.log('error')
      })
  }

  const onMapsLoaded = () => {
    const latlng = api.map.getCenter().toJSON();

    getGeocodedAddress(latlng)
      .then(result => {
        setLocations([{
          latlng,
          addr: result.formatted_address,
        }])
        setCurrentAddress(result.formatted_address)
      }, err => {
        console.log(err)
      })
  }
  
  const onClick = (e) => {
    const latlng = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    };

    getGeocodedAddress(latlng)
    .then(result => {
      setLocations([...locations, {
        latlng,
        addr: result.formatted_address,
      }])
    }, err => {
      console.log(err)
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

      <div className={styles['locations']}>
        <List>
          {locations.length && locations.map((location, i) => (
            <ListItem key={i}>
              <Location location={location} index={i} />
            </ListItem>
          ))}
        </List>
      </div>
    </React.Fragment>
  );
}