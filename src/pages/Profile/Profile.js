import React, { useEffect, useState, useRef } from 'react';
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import Container from '../../components/Container/Container';
import Typography from '../../components/Typography/Typography';
import { Grid, GridItem } from '../../components/Grid/Grid';
import Form, { FormControl, TextInput, PasswordInput, ImageInput } from '../../components/Form/Form';
import { Image } from '../../components/Media/Media';
import Box from '../../components/Box/Box';

import Validate from '../../components/Form/validationRules';

import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import Button from '../../components/Button/Button';

export default function Profile() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const infoRef = useRef();
  const imageInputRef = useRef();

  const { auth } = useAuth(); 
  const navigate = useNavigate();
  const { colors } = useTheme();

  const profileInformation = useOutletContext();
  const [imageSource, setImageSource] = useState("");
  const [emailFormValid, setEmailFormValid] = useState(false);
  const [infoFormValid, setInfoFormValid] = useState(false);
  const [passwordFormValid, setPasswordFormValid] = useState(false);

  const reader = new FileReader();

  reader.onloadend = () => {
    const base64data = reader.result;
    setImageSource(base64data);                
  }

  const checkButtonDisabled = (target, formValid) => {
    if(!formValid) {
      target.disabled = true;
    } else {
      target.disabled = false;
    }
  }

  const updateProfile = async (input) => {
    const field = Object.keys(input)[0];
    
    try {
      await auth.update(auth.user.accessToken, input);
      
      navigate(0);
      toast.success(`${field} successfully updated`, {
        position: toast.POSITION.TOP_CENTER
      });

    } catch(err) {
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }
  
  const updateProfilePicture = async () => {
    try {
      await auth.picture(auth.user.accessToken, {
        base64Image: imageSource
      });

      navigate(0);
      toast.success(`Profile image successfully updated`, {
        position: toast.POSITION.TOP_CENTER
      });

    } catch(err) {
      toast.error(err, {
        position: toast.POSITION.TOP_CENTER
      })
    }
  }

  const checkInput = (e) => {
    const file = e.target.files[0];
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    if(Object.keys(profileInformation).length !== 0) {
      usernameRef.current.value = profileInformation.username;
      emailRef.current.value = profileInformation.email;
      infoRef.current.value = profileInformation?.info ?? "";
      setImageSource(profileInformation.profilePicture);
    }
  }, [profileInformation])

  return (
    <Container element="section" id="profile" backgroundColor={colors.background.black.alpha['15']}>
      <Grid gridRows={8} gridColumns={8} rowGap={30} columnGap={30}>
        <GridItem rowStart={1} columnStart={1} rowEnd={1} columnEnd={8}>
          <Typography fontWeight={700} letterSpacing={2} textColor={colors.text.black.alpha['60']} variant="h1">
            Profile
          </Typography>
        </GridItem>

        <GridItem rowStart={2} columnStart={1} rowEnd={6} columnEnd={4}>
          <Box flexDirection="column" alignItems={'center'} borderRadius={30} padding={30} backgroundColor={colors.background.white.alpha['30']} elevation={2}>
            <Typography textColor={colors.text.black.main} variant="h2" customStyles={{ textAlign: 'center' }}>
              Your Profile Picture
            </Typography>
            <Image height="auto" width={40} source={imageSource} />
          </Box>
        </GridItem>

        <GridItem rowStart={4} columnStart={4} rowEnd={6} columnEnd={6}>
          <Box flexDirection="column" alignItems={'center'} borderRadius={30} padding={30} backgroundColor={colors.background.white.alpha['30']} elevation={2}>
            <Form onSubmit={updateProfilePicture} customStyles={{ padding: '0' }}>
              <ImageInput onChange={checkInput} iRef={imageInputRef} />
              <Button type="submit" size="medium" fullWidth textColor={"black"} color={colors.background.tertiary.main} elevation={3} customStyles={{marginTop: '1rem', color: '#11151C'}}>Change Profile image</Button>
            </Form>
          </Box>
        </GridItem>

        <GridItem rowStart={6} columnStart={1} rowEnd={9} columnEnd={4}>
          <Box flexDirection="column" justifyContent={"space-between"} borderRadius={30} padding={30} backgroundColor={colors.background.white.alpha['30']} elevation={2}>
            <Box>
              <Typography textColor={colors.text.black.alpha['50']} fontWeight={400} variant="h5">
                Username
              </Typography>
              <TextInput readonly iRef={usernameRef} customStyles={{
                border: '2px solid rgba(0, 0, 0, .50)',
                borderRadius: '5px'
              }}/>
            </Box>

            <Box>
              <Typography textColor={colors.text.black.alpha['50']} fontWeight={400} variant="h5">
                Email
              </Typography>
              <Form onSubmit={updateProfile} onValidate={(isValid) => { setEmailFormValid(isValid) }} customStyles={{ padding: '0' }} flex>
                <FormControl validations={[ Validate.isRequired(), Validate.isEmail()]}>
                  <TextInput iRef={emailRef} name="email" customStyles={{
                    width: '20rem',
                    border: '2px solid rgba(0, 0, 0, .50)',
                    borderRadius: '5px'
                  }} />
                </FormControl>
                
                <Button type="submit" color={colors.background.tertiary.main} 
                  isDisabled={(target) => { checkButtonDisabled(target, emailFormValid) }}>Change</Button>
              </Form>
            </Box>

            <Box>
              <Typography textColor={colors.text.black.alpha['50']} fontWeight={400} variant="h5">
                Info
              </Typography>

              <Form onSubmit={updateProfile} onValidate={(isValid) => { setInfoFormValid(isValid) }} customStyles={{ padding: '0' }} flex>
                <FormControl validations={[ Validate.isRequired() ]}>
                  <TextInput iRef={infoRef} name="info" customStyles={{
                    width: '20rem',
                    border: '2px solid rgba(0, 0, 0, .50)',
                    borderRadius: '5px'
                  }} />
                </FormControl>
                
                <Button 
                  type="submit"
                  color={colors.background.tertiary.main}
                  isDisabled={(target) => { checkButtonDisabled(target, infoFormValid) }}>Change</Button>
              </Form>
            </Box>
          </Box>
        </GridItem>

        <GridItem rowStart={6} columnStart={4} rowEnd={9} columnEnd={7}>
        <Box backgroundColor={colors.background.white.alpha['30']} elevation={2} borderRadius={30} padding={50}>
          <Form onSubmit={updateProfile} onValidate={(isValid) => { setPasswordFormValid(isValid) }} customStyles={{padding: '0'}}>
            <FormControl validations={[ Validate.isRequired(), Validate.minLength(6) ]}>
              <PasswordInput placeholder="Password" name="password" customStyles={{
                    width: '100%',
                    border: '2px solid rgba(0, 0, 0, .50)',
                    borderRadius: '5px'
                  }} />
            </FormControl>

            <FormControl validations={[ Validate.isRequired(), Validate.passwordMatch("password") ]}>
              <PasswordInput placeholder="Confirm Password" name="repeatedPassword" customStyles={{
                    width: '100%',
                    border: '2px solid rgba(0, 0, 0, .50)',
                    borderRadius: '5px'
                  }} />
            </FormControl>  

            <Button type="submit" color={colors.background.primary.dark}
            isDisabled={(target) => { checkButtonDisabled(target, passwordFormValid) }}
            size="medium"
            elevation={2}
            customStyles={{
                width: '100%'
            }}>Update Password</Button>
          </Form>
        </Box>
        </GridItem>
      </Grid>
    </Container>
  );
}