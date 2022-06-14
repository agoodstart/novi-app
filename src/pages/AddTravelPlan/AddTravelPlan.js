import React, { Suspense, useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import Marker from '../../components/GoogleMaps/Marker';
import { List, ListItem } from '../../components/List/List';
import Location from '../../components/Location/Location';
import TextInputWithGooglePlaces from '../../components/GoogleMaps/TextInputWithGooglePlaces';

import styles from './AddTravelPlan.module.scss';
import useGoogleApi from '../../hooks/useGoogleApi';

export default function AddTravelPlan() {
  const { api } = useGoogleApi();

  const [center, setCenter] = useState("")
  const [origin, setOrigin] = useState("")
  const [markers, setMarkers] = useState([])
  const [mapZoom, setMapZoom] = useState(11);
  const [mapCenter, setMapCenter] = useState()

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
        setMarkers([{
          latlng,
          addr: result.formatted_address,
          type: 'origin',
          index: markers.length
        }])
        setOrigin(result.formatted_address)
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
      setMarkers([...markers, {
        latlng,
        addr: result.formatted_address,
        type: 'destination',
        index: markers.length
      }])
    }, err => {
      console.log(err)
    })
  }

  const onZoomChange = () => {
    setMapZoom(api.map.getZoom());
  }

  const onIdle = () => {
    setMapCenter(api.map.getCenter().toJSON());

    getGeocodedAddress(api.map.getCenter().toJSON())
    .then(result => {
      setCenter(result.formatted_address);
    }, err => {
      console.log(err)
    })
  }

  const onPlaceChange = (autocomplete) => {
    const place = autocomplete.getPlace();

    api.map.panTo({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
  }

  const onOriginMarkerDragend = (e, index) => {
    const latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() }

    getGeocodedAddress(latlng)
    .then(result => {
      setMarkers(markers.map((marker, i) => {
        if(marker.index === index) {
          marker.latlng = latlng;
        }

        return marker;
      }));

      setOrigin(result.formatted_address)
    }, err => {
      console.log(err)
    })
  }

  const changeCenter = (autocomplete) => {

  }


  useEffect(() => {
    console.log(markers);
  }, [markers])

  return (
    <React.Fragment>
      <div className={styles['travelplan__control']}>
        <div className={styles['travelplan__places']}>
          <label className={styles['travelplan__label']}>Your current location: </label>
          <TextInputWithGooglePlaces 
            autocompleteInstance={api.autocomplete.geo} 
            onPlaceChange={onPlaceChange}
            defaultLocation={origin}
            types={['(cities)']}
            customStyles={{
              borderRadius: '10px'
            }}
          />
        </div>

        <div className={styles['travelplan__places']}>
          <label className={styles['travelplan__label']}>Current Map center: </label>
          <TextInputWithGooglePlaces 
            autocompleteInstance={api.autocomplete.center} 
            onPlaceChange={onPlaceChange}
            defaultLocation={center}
            types={['(cities)']}
            customStyles={{
              borderRadius: '10px'
            }}
          />
        </div>
      </div>

      <Suspense fallback={<p>Loading Google Maps....</p>}>
        <GoogleMaps
          onClick={onClick}
          onZoomChange={onZoomChange}
          onMapsLoaded={onMapsLoaded}
          onIdle={onIdle}
          zoom={mapZoom}
          disableDefaultUI={true}
          zoomControl={true}
          defaultCenter={mapCenter}
          customClassname={styles['travelplan__maps']}
        >
          {markers.length && markers.map((marker, i) => (
            marker.type === 'origin' 
              ? <Marker 
                  key={i} 
                  index={marker.index}
                  onDragend={onOriginMarkerDragend} 
                  position={marker.latlng} 
                  icon={'http://maps.google.com/mapfiles/kml/paddle/red-stars.png'}  
                /> 
              : <Marker 
                  key={i} 
                  index={marker.index}
                  position={marker.latlng} 
                  icon={'http://maps.google.com/mapfiles/kml/paddle/red-circle.png'}  
                /> 
          ))}
        </GoogleMaps>
      </Suspense>

      <div className={styles['locations']}>
        <List>
          {markers.length && markers.map((location, i) => (
            <ListItem key={i}>
              <Location location={location} index={i} />
            </ListItem>
          ))}
        </List>
      </div>
    </React.Fragment>
  );
}