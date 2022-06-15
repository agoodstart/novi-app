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

  const [placeCenter, setPlaceCenter] = useState("");
  const [placeOrigin, setPlaceOrigin] = useState("");

  const [markers, setMarkers] = useState([]);
  const [mapZoom, setMapZoom] = useState(11);
  const [mapCenter, setMapCenter] = useState();

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
        setPlaceOrigin(result.formatted_address)
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
      setPlaceCenter(result.formatted_address);
    }, err => {
      console.log(err)
    })
  }

  const onPlaceChange = (autocomplete) => {
    const place = autocomplete.getPlace();

    api.map.panTo({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
  }

  const onOriginPlaceChange = (autocomplete) => {
    const place = autocomplete.getPlace();
    const latlng = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }

    api.map.panTo(latlng);

    setMarkers(markers.map((marker, i) => {
      if(marker.type === 'origin') {
        marker.latlng = latlng;
      }

      return marker;
    }));
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

      setPlaceOrigin(result.formatted_address)
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
            onPlaceChange={onOriginPlaceChange}
            defaultLocation={placeOrigin}
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
            defaultLocation={placeCenter}
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
          {markers.length && markers.map((marker, i) => (
            marker.type === 'destination' ?
            <ListItem key={i}>
              <Location location={marker} index={i} />
            </ListItem> : console.log('no other element')
          ))}
        </List>
      </div>
    </React.Fragment>
  );
}