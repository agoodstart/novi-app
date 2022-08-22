import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext } from "react-router-dom";
import Container from '../../components/Container/Container';

import Typography from '../../components/Typography/Typography';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Form, { FormControl, TextInput } from '../../components/Form/Form';
import Box from '../../components/Box/Box';

import Validate from '../../components/Form/validationRules';

import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import Button from '../../components/Button/Button';

export default function Profile() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const infoRef = useRef();

  const user = useOutletContext();
  const { auth } = useAuth(); 
  const { colors } = useTheme();

  const [profileInformation, setProfileInformation] = useState({});
  const [emailFormValid, setEmailFormValid] = useState(false);

  const checkButtonDisabled = (target, formValid) => {
    if(!formValid) {
      target.disabled = true;
    } else {
      target.disabled = false;
    }
  }

  const updateProfile = (data) => {
    console.log(data);
  }

  useEffect(() => {
    console.log(emailFormValid)
  }, [emailFormValid])

  useEffect(() => {
    console.log(profileInformation)
    if(Object.keys(profileInformation).length !== 0) {
      usernameRef.current.value = profileInformation.username;
      emailRef.current.value = profileInformation.email;
      infoRef.current.value = profileInformation?.info ?? "";
    }
  }, [profileInformation])

  useEffect(() => {
    auth.profile(user.accessToken).then(data => {
      setProfileInformation(data);
    },
    err => {
      console.log(err)
    })
  }, []);

  return (
    <Container element="section" id="profile" backgroundColor={colors.background.black.alpha['15']}>
      <Grid gridRows={8} gridColumns={8} rowGap={30} columnGap={30}>
        <GridItem rowStart={1} columnStart={1} rowEnd={1} columnEnd={8}>
          <Typography textColor={colors.text.black.alpha['50']} variant="h1">
            My Profile
          </Typography>
        </GridItem>

        <GridItem rowStart={2} columnStart={1} rowEnd={2} columnEnd={3}>
          <Box flexDirection="column">
            <Typography textColor={colors.text.black.alpha['50']} fontWeight={700} variant="h4">
              Username
            </Typography>

            <TextInput readonly iRef={usernameRef} />
          </Box>
        </GridItem>

        <GridItem rowStart={3} columnStart={1} rowEnd={3} columnEnd={3}>
          <Box flexDirection="column">
            <Typography textColor={colors.text.black.alpha['50']} fontWeight={700} variant="h4">
              Email
            </Typography>

            <Form onSubmit={updateProfile} onValidate={(isValid) => { setEmailFormValid(isValid) }} customStyles={{ padding: '0' }}>
              <FormControl validations={[ Validate.isRequired(), Validate.isEmail()]}>
                <TextInput iRef={emailRef} name="email" />
              </FormControl>
              
              <Button color={colors.background.primary.alpha['80']} 
                elevation={1} 
                customStyles={{ width: '100%' }} 
                isDisabled={(target) => { checkButtonDisabled(target, emailFormValid) }}>Change</Button>
            </Form>
          </Box>
        </GridItem>

        <GridItem rowStart={4} columnStart={1} rowEnd={4} columnEnd={3}>
          <Box flexDirection="column">
            <Typography textColor={colors.text.black.alpha['50']} fontWeight={700} variant="h4">
              Info
            </Typography>

            <TextInput iRef={infoRef}/>
            <Button color={colors.background.primary.alpha['80']} elevation={1} customStyles={{marginTop: '1rem'}}>Change</Button>
          </Box>
        </GridItem>

        <GridItem rowStart={6} columnStart={1} rowEnd={6} columnEnd={3}>
          <Box flexDirection="column">
          <Button size="large" color={colors.background.secondary.alpha['80']} elevation={3} customStyles={{marginTop: '1rem'}}>Change Password</Button>
          </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}