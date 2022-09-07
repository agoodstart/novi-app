import React from "react";


import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useLocalStorage from "../../hooks/useLocalStorage";

import { Grid, GridItem } from "../../components/Grid/Grid";
import Typography from "../../components/Typography/Typography"
import Box from "../../components/Box/Box";
import Button from "../../components/Button/Button";
import Destination from "./Destination/Destination";
import Container from "../../components/Container/Container";

export default function Destinations() {
  console.log('hello')
  const navigate = useNavigate();
  const {colors} = useTheme();
  const [destinations, _] = useLocalStorage("destinations", []);

  const viewDestination = (destination) => {
    navigate(`/destinations/destination/${destination.placeId}`, { 
      state: destination
     })
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
          <Box height={100} scrollable>
            {!destinations.length ?
              <Typography variant="h2" textColor={colors.text.gray.main}>There are no destinations set yet</Typography> :
              destinations.map((destination, i) => (
                <Box key={i} height="auto" width={95} elevation={2} borderRadius={5} flexDirection="row" justifyContent="space-between" padding={30} backgroundColor={colors.background.white.main} customStyles={{
                  marginTop: '2rem',
                  border: '1px solid rgba(0, 0, 0, .50)'
                }}>
                  <Typography variant="h4" customStyles={{ paddingLeft: '15px' }}>
                    {destination.formattedAddress}
                  </Typography>

                  <Box width="auto">
                    <Button color={colors.background.primary.main} customStyles={{ marginRight: '20px' }} onClick={viewDestination.bind(null, destination)}>
                      View Destination
                    </Button>

                    <Button color={colors.background.secondary.main}>
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