import React, { Suspense, useMemo, useEffect, useState, useDeferredValue} from 'react';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Container from '../../components/Container/Container';
import Typography from '../../components/Typography/Typography';
import Box from '../../components/Box/Box';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Button from '../../components/Button/Button';

import useTheme from '../../hooks/useTheme';
import useSuspense from '../../hooks/useSuspense';
import useLocalStorage from '../../hooks/useLocalStorage';
import DashboardWeather from './DashboardWeather';

export default function DashboardHome() {
  const suspender = useSuspense();
  const navigate = useNavigate();
  const { colors } = useTheme();
  const user = useOutletContext();

  const [destinations, _] = useLocalStorage("destinations", []);

  const [currentLocation, setCurrentLocation] = useState(null);

  const memoizedWeather = useMemo(() => {
    return suspender.fetchOpenWeatherAPI({ lat: 52.132633, lng: 5.2912659 });
  }, []);

  const getCurrentDateTime = () => {
    const today = new Date();

    const now = today.toLocaleDateString("en-GB", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      // timeZone: 'CET',
      // timeZoneName: 'short'
    })

    return now;
  }

  const getBestDestination = () => {
    if(destinations.length === 0) {
      return;
    }

    return destinations.reduce((prev, curr) => {
      if(prev.temperature > curr.temperature) {
        return prev;
      } else {
        return curr;
      }
    })
  }

  const setLocationData = (loc) => {
    setCurrentLocation(loc);
    console.log(loc);
  } 


  return (
    <Container element="section" backgroundColor={colors.background.black.alpha['15']}>
        <Grid gridRows={8} gridColumns={8} rowGap={30} columnGap={30}>
          <GridItem rowStart={1} columnStart={1} rowEnd={1} columnEnd={8}>
            <Typography textColor={colors.text.black.alpha['50']} variant="h1">
              <strong>Welcome,</strong> {user}
            </Typography>
          </GridItem>

          <GridItem columnStart={1} columnEnd={6} rowStart={2} rowEnd={5} >
            <Box padding={20} borderRadius={30} backgroundColor={colors.background.tertiary.light} elevation={2}>
              <Typography variant={"h2"} fontWeight="700" textColor={colors.text.white.main}>Today is</Typography>

              <Typography variant="h3" textColor={colors.text.white.main}>{getCurrentDateTime()}</Typography>
            </Box>
          </GridItem>

          <GridItem columnStart={1} columnEnd={3} rowStart={5} rowEnd={8} >
            <Box padding={20} borderRadius={30} backgroundColor={colors.background.white.alpha['30']} elevation={2}>
            <Typography variant={"h4"} fontWeight="700" textColor={colors.text.black.alpha['80']}>Current weather:</Typography>
              <Suspense fallback={<Typography>Loading current Weather information...</Typography>}>
                <DashboardWeather weather={memoizedWeather} />
                {/* <ReadLocation /> */}
              </Suspense>
            </Box>
          </GridItem>

          <GridItem columnStart={6} columnEnd={9} rowStart={2} rowEnd={9} >
            <Box borderRadius={30} backgroundColor={colors.background.white.alpha['30']} elevation={2}>

            </Box>
          </GridItem>

          <GridItem columnStart={3} columnEnd={6} rowStart={5} rowEnd={9} >
            <Box padding={20} borderRadius={30} backgroundColor={colors.background.white.alpha['30']} elevation={2}>
              <Typography variant={"h2"} fontWeight="700" textColor={colors.text.black.alpha['80']}>You have</Typography>
              <Typography variant="h3" textColor={colors.text.black.alpha['60']}>{destinations.length} destinations listed</Typography>
              <Typography variant="h4" textColor={colors.text.black.alpha['60']}>
                {destinations.length > 0
                  ? <>You should consider visiting <strong>{getBestDestination()?.formattedAddress}</strong> next</>
                  : <>You should consider adding some destinations</>}
              </Typography>
            </Box>
          </GridItem>

          <GridItem columnStart={1} columnEnd={3} rowStart={8} rowEnd={9} >
              <Button pill color={colors.background.primary.light} elevation={2} size="medium-large" onClick={() => { navigate('/addtravelplan'); }} customStyles={{width: '100%'}}>
                Add new Travel Plan
              </Button>
          </GridItem>
        </Grid>
    </Container>
  );
}