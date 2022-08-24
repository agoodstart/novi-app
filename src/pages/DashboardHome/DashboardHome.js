import React, { Suspense, useMemo, useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Container from '../../components/Container/Container';
import Typography from '../../components/Typography/Typography';
import Box from '../../components/Box/Box';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Button from '../../components/Button/Button';
import Image from '../../components/Image/Image';

import useTheme from '../../hooks/useTheme';
import useSuspense from '../../hooks/useSuspense';
import useLocalStorage from '../../hooks/useLocalStorage';
import useAuth from '../../hooks/useAuth';


export default function DashboardHome() {
  const suspender = useSuspense();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { colors } = useTheme();
  const user = useOutletContext();

  const [destinations, _] = useLocalStorage("destinations", []);

  const [profileInformation, setProfileInformation] = useState({});

  const memoizedWeather = useMemo(() => {
    return suspender.fetchOpenWeatherAPI({ lat: 52.132633, lng: 5.2912659 });
  }, []);

  useEffect(() => {
    auth.profile(user?.accessToken).then(data => {
      setProfileInformation(data);
    },
    err => {
      console.log(err)
    })
  }, []);

  useEffect(() => {
    console.log(profileInformation);
  })

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

  return (
    <Container element="section" id="dashboard" backgroundColor={colors.background.black.alpha['15']}>
        <Grid gridRows={8} gridColumns={8} rowGap={30} columnGap={30}>
          <GridItem rowStart={1} columnStart={1} rowEnd={1} columnEnd={8}>
            <Typography textColor={colors.text.black.alpha['50']} variant="h1">
              <strong>Welcome,</strong> {profileInformation?.username}
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
            <Typography variant={"h4"} fontWeight="700" textColor={colors.text.black.alpha['80']}>Today's forecast:</Typography>
              <Suspense fallback={<Typography>Loading current Weather information...</Typography>}>
                <DashboardWeather weather={memoizedWeather} />
              </Suspense>
            </Box>
          </GridItem>

          <GridItem columnStart={6} columnEnd={9} rowStart={2} rowEnd={9} >
            <Box borderRadius={30} padding={20} backgroundColor={colors.background.white.alpha['30']} elevation={2} flexDirection="column" alignItems="center">
              <Typography variant="h2" fontWeight={700} textColor={colors.text.black.alpha['80']}>My Profile</Typography>
              <Image height={40} width="auto" source={profileInformation?.profilePicture} />
              <Typography variant="h3" fontWeight={700} textColor={colors.text.black.alpha['80']}>{profileInformation?.username}</Typography>
              <Typography variant="h3">{profileInformation?.email}</Typography>

              <Button customStyles={{
                marginTop: '2rem'
              }} color={colors.background.primary.light} elevation={1} size="large" onClick={() => { navigate('/profile')}}>Edit Profile</Button>
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

function DashboardWeather(props) {

  const weather = props.weather.read();
  console.log(weather.current);

  return (
    <>
      <Typography fontWeight="700">Temperature:</Typography> 
      <Typography>{weather.current.temp} &#8451;</Typography>

      <Typography fontWeight="700" customStyles={{
        marginTop: '1rem'
      }}>Feels like:</Typography> 
      <Typography>{weather.current.feels_like} &#8451;</Typography>
      
      <Typography fontWeight="700" customStyles={{
        marginTop: '1rem'
      }}>Weather:</Typography>
      <Typography>{weather.current.weather[0].description}</Typography>
    </>
  )
}