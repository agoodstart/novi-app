import React, { Suspense, useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import Marker from '../../components/GoogleMaps/Marker';
import Location from '../../components/Location/Location';
import TextInputWithGooglePlaces from '../../components/GoogleMaps/TextInputWithGooglePlaces';
import { NumberInput } from '../../components/Form/Form';

import styles from './AddTravelPlan.module.scss';
import useGoogleApi from '../../hooks/useGoogleApi';
import Typography from '../../components/Typography/Typography';
import Button from '../../components/Button/Button';

export default function AddTravelPlan() {
  const { api } = useGoogleApi();

  const [placeCenter, setPlaceCenter] = useState("");
  const [placeOrigin, setPlaceOrigin] = useState("");

  const [maxTravelDistance, setMaxTravelDistance] = useState(1000);

  const [markers, setMarkers] = useState([]);
  const [markerMoved, setMarkerMoved] = useState(null);

  const [mapZoom, setMapZoom] = useState(8);
  const [mapCenter, setMapCenter] = useState();

  const calculateMarkerDistance = (destinationMarker) => {
    const originMarker = markers.find(marker => marker.type === 'origin');

    // I didn't calc this myself lol
    // https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
    const R = 6371.0710 // Radius of earth in km
    // var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = originMarker.latlng.lat * (Math.PI/180); // Convert degrees to radians
    var rlat2 = destinationMarker.latlng.lat * (Math.PI/180); // Convert degrees to radians
    var difflat = rlat2-rlat1; // Radian difference (latitudes)
    var difflon = (destinationMarker.latlng.lng-originMarker.latlng.lng) * (Math.PI/180); // Radian difference (longitudes)
  
    // idk wtf this calculation is but whatever
    var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d.toFixed(2);
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
      // console.log(results);
        const formattedAddr = results.reduce((res, location) => {
          if(location.types.includes('locality') || location.types.includes('postal_town') ||location.types.includes('administrative_area_level_3')) {
            res = location;
          };

          return res;
        }, null)

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

  const onLocationCenter = (locationMarker) => {
    api.map.panTo(locationMarker.latlng);
  }

  const onLocationRemove = (locationMarker) => {
    setMarkers(markers.filter(marker => marker.index !== locationMarker.index))
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

    setMarkers(markers.map((marker) => {
      if(marker.type === 'origin') {
        marker.latlng = latlng;
      }

      return marker;
    }));
  }

  function onMarkerDragend(e, index) {
    const latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    setMarkerMoved({
      index,
      latlng
    });
  }

  const placeMarker = (m) => {
    getGeocodedAddress(m.latlng)
    .then(result => {
      setMarkers(markers.map((marker, i) => {
        if(marker.index === m.index) {
          marker.latlng = m.latlng;
        }

        return marker;
      }));

      setPlaceOrigin(result.formatted_address)
    }, err => {
      console.log(err)
    })
  }

  const onDistanceChange = (e) => {
    setMaxTravelDistance(e.target.value);
  }

  const showWarning = (address) => {
    toast.warn(`${address} is not within the specified travel distance range`);
  }

  useEffect(() => {
    if(markerMoved) {
      placeMarker(markerMoved)
    }
  }, [markerMoved])

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

        <div className={styles['travelplan__places']}>
          <label className={styles['travelplan__label']}>Max travel distance: </label>
          <NumberInput 
            value={maxTravelDistance}
            onChange={onDistanceChange}
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
                  onDragend={onMarkerDragend} 
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

      <div className="travelplan__zoom">
        
      </div>

      <div className={styles['locations']}>
        {markers.length && markers.filter(marker => marker.type === 'destination').map((marker, i) => (
          <Location 
              key={i}
              marker={marker} 
              maxTravelDistance={maxTravelDistance}
              showWarning={showWarning}
              calculateMarkerDistance={calculateMarkerDistance}
              onCenter={onLocationCenter}
              onRemove={onLocationRemove}
              gridPosition={++i}
          />
      ))}
      </div>

      <div className={styles['travelplan__choices']}>
        <div className={styles['travelplan__choices-suggested']}>
          <Typography variant="h4">
            Our choice:
          </Typography>
          <Typography variant="paragraph">
            Amsterdam, Netherlands
          </Typography>
        </div>

        <div className={styles['travelplan__choices-chosen']}>
          <Typography variant="h4">
            Your choice:
          </Typography>
        </div>
      </div>

      <div className={styles['travelplan__save']}>
      <Button 
          // color={colors.secondary.medium}
          variant="contained"
          size="large"
          boxShadow="light"
          onClick={() => {}}
          customStyles={{
            width: '100%',
            height: '100%'
          }}
          >
            Save chosen destination
        </Button>
      </div>
    </React.Fragment>
  );
}