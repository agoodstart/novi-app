import React, { useEffect, useState } from 'react';
import { useOutletContext } from "react-router-dom";
import Container from '../../components/Container/Container';

import Typography from '../../components/Typography/Typography';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Box from '../../components/Box/Box';

import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';

export default function Social() {
  const user = useOutletContext();

  const { auth } = useAuth();
  const { colors } = useTheme();

  const [users, setUsers] = useState([])

  useEffect(() => {
    auth.all(user.accessToken).then(data => {
      setUsers(data);
      console.log(data);
    })
  }, [])

  return (
    <Container element="section" id="social" backgroundColor={colors.background.black.alpha['15']}>
      <Grid gridRows={8} gridColumns={8} rowGap={30} columnGap={30}>
        <GridItem rowStart={1} columnStart={1} rowEnd={1} columnEnd={8}>
          <Typography textColor={colors.text.black.alpha['50']} variant="h1">
            Social
          </Typography>
        </GridItem>

        <GridItem rowStart={2} columnStart={1} rowEnd={9} columnEnd={8}> 
          <Box height={100} scrollable>
            {!users.length ?
              <Typography variant="h2" textColor={colors.text.gray.main}>There are no users registered</Typography> :
              users.map((user, i) => (
                <Box key={i} height="auto" width={95} elevation={2} borderRadius={5} flexDirection="column" justifyContent="space-between" padding={30} backgroundColor={colors.background.white.main} customStyles={{
                  marginTop: '2rem',
                  border: '1px solid rgba(0, 0, 0, .50)'
                }}>
                  <Typography variant="h4" textColor={colors.text.black.alpha['50']}>
                    {user.email}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} textColor={colors.text.black.alpha['50']}>
                    {user.username}
                  </Typography>
                </Box>
              ))
            }
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}