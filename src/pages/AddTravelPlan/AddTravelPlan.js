import React, { useEffect, useState, Suspense, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import TravelPlanMap from './TravelPlanMap';
import TravelPlanControl from './TravelPlanControl';
import TravelPlanDestinations from './TravelPlanDestinations';
import TravelPlanChoices from './TravelPlanChoices';
import TravelPlanModal from './TravelPlanModal';

import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import { Grid, GridItem } from '../../components/Grid/Grid';

import useLocalStorage from '../../hooks/useLocalStorage';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import Typography from '../../components/Typography/Typography';

const fetchCurrentLocation = (fallback) => {
  let status = 'pending';
  let response;

  const suspender = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      pos => {
        return resolve({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      },
      error => reject(error)
    )
  })
  .then(
    (res) => {  
      setTimeout(() => {
        status = 'success';
        response = res;
      })
    },
    (err) => {
      status = 'error';
      response = fallback;
    })

  const read = () => {
    switch (status) {
      case 'pending':
        throw suspender;
      case 'error':
        return fallback;
      default:
        return response;
    }
  }

  return { read }
}

export default function AddTravelPlan() {
  const navigate = useNavigate();
  const { modalRef } = useAuth();
  const { colors } = useTheme();

  const [savedDestinations, setSavedDestinations] = useLocalStorage("destinations", []);

  const [placeCenter, setPlaceCenter] = useState("");
  const [placeOrigin, setPlaceOrigin] = useState("");

  const [maxTravelDistance, setMaxTravelDistance] = useState(1000);

  const [origin, setOrigin] = useState({});
  const [destinations, setDestinations] = useState([]);

  const [recommended, setRecommended] = useState({});
  const [chosen, setChosen] = useState({});

  const deviceLocation = useMemo(() => {
    return fetchCurrentLocation({ lat: 52.132633, lng: 5.2912659 });
  }, []);

  const showWarning = (text) => {
    toast.warn(text);
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

  const checkSaveButton = (target) => {
    if(Object.keys(chosen).length === 0) {
      target.disabled = true;
    } else {
      target.disabled = false;
    }
  }

  useEffect(() => {
    if(destinations.length > 0) {
      destinations.forEach(destination => {
        if(destination.distance >= parseInt(maxTravelDistance) || !maxTravelDistance) {
          showWarning(`${destination.formattedAddress} is not within the specified travel distance range`);
        }
      })
    }
  }, [destinations, maxTravelDistance]);

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

  return (
    <Container element="section">
      <Grid gridRows={8} gridColumns={8} rowGap={15} columnGap={15}>

        <GridItem rowStart={1} columnStart={1} rowEnd={1} columnEnd={6}>
          <TravelPlanControl 
            setOrigin={setOrigin} 
            maxTravelDistance={maxTravelDistance} 
            setMaxTravelDistance={setMaxTravelDistance} 
            placeOrigin={placeOrigin} 
            placeCenter={placeCenter} />
        </GridItem>

        <GridItem rowStart={2} columnStart={1} rowEnd={8} columnEnd={6}>
          <Suspense fallback={<Typography variant="paragraph">Loading Google Maps... </Typography>}>
            <TravelPlanMap 
              origin={origin}
              setOrigin={setOrigin}
              destinations={destinations}
              setDestinations={setDestinations}
              setPlaceOrigin={setPlaceOrigin} 
              setPlaceCenter={setPlaceCenter} 
              showWarning={showWarning}
              deviceLocation={deviceLocation} />
          </Suspense>
        </GridItem>

        <GridItem rowStart={1} columnStart={6} rowEnd={7} columnEnd={9}> 
          <TravelPlanDestinations 
            chosen={chosen} 
            setChosen={setChosen} 
            destinations={destinations} 
            setDestinations={setDestinations}  />
        </GridItem>

        <GridItem rowStart={7} columnStart={6} rowEnd={9} columnEnd={9}>
          <TravelPlanChoices
            recommended={recommended}
            chosen={chosen} />
        </GridItem>

        <GridItem rowStart={8} columnStart={1} rowEnd={8} columnEnd={6}>
          <Button 
            color={colors.background.primary.main} 
            isDisabled={checkSaveButton}
            size="large"
            elevation={2}
            onClick={handleOpenModal}
            customStyles={{
              width: '100%',
              height: '100%'
            }}
            >
              Save chosen destination
          </Button>
        </GridItem>
      </Grid>

      <TravelPlanModal chosen={chosen} modalRef={modalRef} saveDestination={saveDestination} handleCloseModal={handleCloseModal} />
    </Container>
  )
}