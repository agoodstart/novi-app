import React, { Suspense, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { nanoid } from 'nanoid';
import 'react-toastify/dist/ReactToastify.css';

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import { OriginMarker, DestinationMarker } from '../../components/GoogleMaps/Marker';
import Location from '../../components/Location/Location';
import TextInputWithGooglePlaces from '../../components/GoogleMaps/TextInputWithGooglePlaces';
import { NumberInput } from '../../components/Form/Form';
import Typography from '../../components/Typography/Typography';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';

import styles from './AddTravelPlan.module.scss';

import useGoogleApi from '../../hooks/useGoogleApi';
import useLocalStorage from '../../hooks/useLocalStorage';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

export default function AddTravelPlan() {
  const navigate = useNavigate();
  const { modalRef } = useAuth();
  const { colors } = useTheme()
  const { api } = useGoogleApi();

  const [savedDestinations, setSavedDestinations] = useLocalStorage("destinations", []);

  const [placeCenter, setPlaceCenter] = useState("");
  const [placeOrigin, setPlaceOrigin] = useState("");

  const [maxTravelDistance, setMaxTravelDistance] = useState(1000);

  const [origin, setOrigin] = useState({});
  const [destinations, setDestinations] = useState([]);
  const [destinationDragged, setDestinationDragged] = useState(null)

  const [recommended, setRecommended] = useState({});
  const [chosen, setChosen] = useState({})

  const [mapZoom, setMapZoom] = useState(8);
  const [mapCenter, setMapCenter] = useState();

  const onMapsLoaded = () => {
    const latlng = api.map.getCenter().toJSON();

    api.getGeocodedAddress(latlng)
      .then(result => {
        setOrigin({
          latlng,
          addr: result.formatted_address
        });

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

    api.getGeocodedAddress(latlng)
    .then(result => {
      setDestinations([...destinations, {
        latlng,
        addr: result.formatted_address,
        id: nanoid(),
        distance: 0,
        temperature: '',
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

    api.getGeocodedAddress(api.map.getCenter().toJSON())
    .then(result => {
      setPlaceCenter(result.formatted_address);
    }, err => {
      console.log(err)
    })
  }

  const onLocationCenter = (destinationMarker) => {
    api.map.panTo(destinationMarker.latlng);
  }

  const onLocationRemove = (destinationMarker) => {
    console.log(destinations);
    setDestinations(destinations.filter(destination => destination.id !== destinationMarker.id))
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

    setOrigin({
      latlng,
      addr: place.formatted_address
    })
  }

  function onOriginDragend(e) {
    const latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    api.getGeocodedAddress(latlng)
    .then(result => {
      setOrigin({
        latlng,
        addr: result.formatted_address
      });

      setPlaceOrigin(result.formatted_address)
    }, err => {
      console.log(err)
    })
  }

  function onDestinationDragend(e, id) {
    console.log(id);
    const latlng = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    api.getGeocodedAddress(latlng)
    .then(result => {
      setDestinationDragged({
        id,
        latlng,
        addr: result.formatted_address
      })
    }, err => {
      console.log(err)
    })
  }

  const updateMarkerInfo = (temp, distance, marker) => {
    setDestinations(destinations.map(destination => {
      if(destination.id === marker.id) {
        destination.distance = parseFloat(distance);
        destination.temperature = temp;
      }

      return destination;
    }))
  }

  const updateChosen = (d) => {
    if(d.id === chosen.id) {
      setChosen({})
    } else {
      setChosen(d);
    }
  }

  const onDistanceChange = (e) => {
    setMaxTravelDistance(e.target.value);
  }

  const showWarning = (address) => {
    toast.warn(`${address} is not within the specified travel distance range`);
  }

  useEffect(() => {
    console.log(destinationDragged);
    if(destinationDragged) {
      setDestinations(destinations.map(destination => {
        if(destination.id === destinationDragged.id) {
          destination.latlng = destinationDragged.latlng;
          destination.addr = destinationDragged.addr;

          console.log(destination)
        }

        return destination;
      }))
    }

    return () => {
      setDestinationDragged(null);
    }
  }, [destinationDragged])

  useEffect(() => {
    if(destinations.length >= 2) {
      setRecommended(destinations.reduce((prev, curr) => {
        let [
          prevScore, 
          currScore
        ] = [
          calculateDistanceScore(prev.distance) + calculateWeatherScore(prev.temperature), 
          calculateDistanceScore(curr.distance) + calculateWeatherScore(curr.temperature)
        ];

        if(prevScore > currScore) {
          return prev;
        } else {
          return curr;
        }
      }))
    }
  }, [destinations]);

  const calculateDistanceScore = (distance) => {
    let score = 0;
    let [q1, q2, q3, q4] = [maxTravelDistance / 4, maxTravelDistance / 3, maxTravelDistance / 2, maxTravelDistance];

    if(distance > 0 && distance < q1) {
      score = 4;
    } else if(distance > q1 && distance < q2) {
      score = 3;
    } else if(distance > q2 && distance < q3) {
      score = 2;
    } else if(distance > q3 && distance < q4) {
      score = 1;
    } else if(distance > q4) {
      score = -1;
    }

    return score;
  }

  const calculateWeatherScore = (temperature) => {
    let score = 0;
    let [q1, q2, q3, q4] = [30, 25, 20, 15];

    if(temperature > q2 && temperature < q1) {
      score = 4;
    } else if(temperature > q3 && temperature < q2) {
      score = 3;
    } else if(temperature > q4 && temperature < q3) {
      score = 1; 
    } else if(temperature > q1) {
      score = 2
    }

    return score;
  }

  const handleOpenModal = () => {
    modalRef.current.openModal();
  }

  const handleCloseModal = () => {
    modalRef.current.closeModal();
  }

  const saveDestination = () => {
    setSavedDestinations(savedDestinations.concat([chosen]));
    navigate('/destinations');
  }


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
          <OriginMarker onDragend={onOriginDragend} marker={origin} />
          {destinations.map((destination, i) => (
            <DestinationMarker onDragend={onDestinationDragend} marker={destination} key={i} />
          ))}
        </GoogleMaps>
      </Suspense>

      {/* <div className="travelplan__zoom">
        
      </div> */}

      <div className={styles['locations']}>
        {destinations.map((destination, i) => (
          <Location 
              key={i}
              destination={destination} 
              origin={origin}
              chosen={chosen}
              maxTravelDistance={maxTravelDistance}
              showWarning={showWarning}
              updateChosen={updateChosen}
              updateMarkerInfo={updateMarkerInfo}
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
            {recommended.addr}
          </Typography>
        </div>

        <div className={styles['travelplan__choices-chosen']}>
          <Typography variant="h4">
            Your choice:
          </Typography>
          <Typography variant="paragraph">
            {chosen.addr}
          </Typography>
        </div>
      </div>

      <div className={styles['travelplan__save']}>
      <Button 
          color={colors.primary.gradient.full} 
          isDisabled={Object.keys(chosen).length === 0}
          variant="contained"
          size="large"
          boxShadow="light"
          onClick={handleOpenModal}
          customStyles={{
            width: '100%',
            height: '100%'
          }}
          >
            Save chosen destination
        </Button>
      </div>

      <Modal ref={modalRef} >
        <div style={{
          background: colors.white,
          // width: '70vh',
          // height: '70vh',
          padding: '5rem',
          borderRadius: '10px'
        }}>
          <Typography variant="h4" fontWeight="400" >Are you sure you want to save <strong>{chosen.addr}</strong> as your next destination?</Typography>

          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '20px'
          }}>
          <Button
            onClick={saveDestination}
            color={colors.primary.gradient.half}
            variant="contained"
            size="medium"
            boxShadow="light"
          >
            Yes
          </Button>
          <Button
            onClick={handleCloseModal}
            color={colors.secondary.gradient.half}
            variant="contained"
            size="medium"
            boxShadow="light"
          >
            No
          </Button>
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
}