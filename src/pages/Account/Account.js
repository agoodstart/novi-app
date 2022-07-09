import React from 'react';
import { useOutletContext } from "react-router-dom";
import Container from '../../components/Container/Container';
import Typography from '../../components/Typography/Typography';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Box from '../../components/Box/Box';
import useTheme from '../../hooks/useTheme';

export default function Account() {
  const user = useOutletContext();
  const { colors } = useTheme();

    return (
      <Container element="section">
        <Grid gridRows={8} gridColumns={8} rowGap={30} columnGap={30}>
          
          <GridItem columnStart={3} columnEnd={6} rowStart={3} rowEnd={8} >
            <Box borderRadius={30} backgroundColor={colors.background.primary.main} elevation={2}>

            </Box>
          </GridItem>
        </Grid>
    </Container>
    );
  }