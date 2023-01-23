import React, { useEffect, useState, Suspense, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import { Parallax } from 'react-scroll-parallax';

import TravelPlanMap from './TravelPlanMap';
import TravelPlanControl from './TravelPlanControl';
import TravelPlanDestinations from './TravelPlanDestinations';
import TravelPlanChoices from './TravelPlanChoices';
import TravelPlanModal from './TravelPlanModal';

import Button from '../../components/Button/Button';
import Container from '../../components/Container/Container';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Typography from '../../components/Typography/Typography';

import useSuspense from '../../hooks/useSuspense';
import useLocalStorage from '../../hooks/useLocalStorage';
import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

import useAmadeusApi from '../../hooks/useAmadeusApi';

export default function AddTravelPlan() {
  const suspender = useSuspense();
  const navigate = useNavigate();
  const { modalRef } = useAuth();
  const { colors } = useTheme();

  const [savedDestinations, setSavedDestinations] = useLocalStorage("destinations", []);

  const [placeCenter, setPlaceCenter] = useState("");
  const [placeOrigin, setPlaceOrigin] = useState("");

  const [maxTravelDistance, setMaxTravelDistance] = useState(1000);

  const [origin, setOrigin] = useState({});
  const [destinations, setDestinations] = useState([]);

  const [chosenDestinations, setChosenDestinations] = useState([]);

  const [recommended, setRecommended] = useState({});
  const [chosen, setChosen] = useState({});

  const deviceLocation = useMemo(() => {
    return suspender.fetchCurrentLocation({ lat: 52.132633, lng: 5.2912659 });
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
    } else {
      setRecommended(null);
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
    <React.Fragment>
      <Parallax speed={-50}>
        <Container element="section" backgroundColor={colors.background.black.alpha['15']} >
          <Grid gridRows={8} gridColumns={8} rowGap={15} columnGap={15}>

            <GridItem rowStart={1} columnStart={1} rowEnd={1} columnEnd={9}>
              <TravelPlanControl 
                setOrigin={setOrigin} 
                maxTravelDistance={maxTravelDistance} 
                setMaxTravelDistance={setMaxTravelDistance} 
                placeOrigin={placeOrigin} 
                placeCenter={placeCenter} />
            </GridItem>

            <GridItem rowStart={2} columnStart={1} rowEnd={8} columnEnd={9}>
              <Suspense fallback={<Typography variant="h1">Loading Google Maps... </Typography>}>
                <TravelPlanMap 
                  origin={origin}
                  setOrigin={setOrigin}
                  destinations={destinations}
                  chosenDestinations={chosenDestinations}
                  setChosenDestinations={setChosenDestinations}
                  // lockedLocations={lockedLocations}
                  setDestinations={setDestinations}
                  setPlaceOrigin={setPlaceOrigin} 
                  setPlaceCenter={setPlaceCenter} 
                  maxTravelDistance={maxTravelDistance}
                  showWarning={showWarning}
                  deviceLocation={deviceLocation} />
              </Suspense>
            </GridItem>
          </Grid>

          <TravelPlanModal chosen={chosen} modalRef={modalRef} saveDestination={saveDestination} handleCloseModal={handleCloseModal} />
        </Container>
      </Parallax>
      <Parallax speed={30}
        translateY={['-100px', '100px', 'easeIn']}>
      <Container element="section" backgroundColor={colors.background.white.main} customStyles={{
        boxShadow: "0 -5px 5px -5px #333",
        zIndex: "9999"
      }}>
          <TravelPlanDestinations 
            chosen={chosen} 
            setChosen={setChosen} 
            destinations={chosenDestinations} 
            setDestinations={setChosenDestinations}  
          />
      </Container>
      </Parallax>
    </React.Fragment>
  )
}