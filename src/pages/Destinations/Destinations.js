import React from "react";
import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useLocalStorage from "../../hooks/useLocalStorage";
import { toast } from 'react-toastify';

import { Grid, GridItem } from "../../components/Grid/Grid";
import Typography from "../../components/Typography/Typography"
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Container from "../../components/Container/Container";
import { Image } from "../../components/Media/Media";

export default function Destinations() {
  const navigate = useNavigate();
  const {colors} = useTheme();
  const [destinations, setDestinations] = useLocalStorage("destinations", []);

  const viewDestination = (destination) => {
    navigate(`/destinations/destination/${destination.placeId}`, { 
      state: destination
     })
  }

  const removeDestination = (selectedDestination) => {
    toast.warn(`Removed ${selectedDestination.formattedAddress} from the list`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 1000
    });

    setDestinations(destinations.filter(destination => destination.placeId !== selectedDestination.placeId))
  }

  return (
    <Container element="section" id="destinations" backgroundColor={colors.background.black.alpha['15']}>
      <Grid gridRows={8} gridColumns={8} rowGap={30} columnGap={30}>
        <GridItem rowStart={1} columnStart={1} rowEnd={1} columnEnd={8}>
          <Typography textColor={colors.text.black.alpha['50']} variant="h1">
            Destinations
          </Typography>
        </GridItem>

        <GridItem rowStart={2} columnStart={1} rowEnd={9} columnEnd={8}> 
          <Box height={100} scrollable padding={10}>
            {!destinations.length ?
              <Typography variant="h2" textColor={colors.text.gray.main}>There are no destinations set yet</Typography> :
              destinations.map((destination, i) => (
                <Box key={i} height="auto" width={95} elevation={2} borderRadius={30} flexDirection="row" justifyContent="space-between" padding={30} backgroundColor={colors.background.white.main} customStyles={{
                  marginTop: '2rem',
                  position: 'relative'
                }}>
                  <Image source={destination.image} customStyles={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  borderRadius: '30px',
                  opacity: '0.5'
                  }} />
                  <Typography variant="h4" fontWeight={400} elevation={2} customStyles={{ paddingLeft: '15px' }}>
                    {destination.formattedAddress}
                  </Typography>

                  <Box width="auto">
                    <Button type="button" color={colors.background.primary.main} textColor={'black'} customStyles={{ marginRight: '20px' }} onClick={viewDestination.bind(null, destination)} elevation={2}>
                      View Destination
                    </Button>

                    <Button type="button" color={colors.background.secondary.main} onClick={removeDestination.bind(null, destination)} elevation={2} textColor={'black'} >
                      Remove Destination
                    </Button>
                  </Box>
                </Box>
              ))
            }
          </Box>
        </GridItem>
      </Grid>
    </Container>
  )
}