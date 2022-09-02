import React from 'react';
import { useNavigate } from 'react-router-dom';

import useTheme from '../../hooks/useTheme';

import Image from '../../components/Image/Image'
import Button from '../../components/Button/Button';
import Typography from '../../components/Typography/Typography';
import Center from '../../components/Center/Center';


export default function Unauthorized() {
  const {colors } = useTheme();
  const navigate = useNavigate();

  console.log('Unauthorized page rendered');
  return (
    <React.Fragment>
      <Image customStyles={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0'
      }} source="/assets/locked.jpg" />

      <Center>
        <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h1">
          You do not have access to view this page
        </Typography>

        <Button 
          color={colors.background.primary.main}
          size="large"
          elevation="2"
          onClick={() => navigate(-2)}
          customStyles={{
            marginTop: '1rem'
          }}
          >
          Go Back
        </Button>

        <Button 
          color={colors.background.tertiary.main}
          size="large"
          elevation="2"
          onClick={() => navigate(-2)}
          customStyles={{
            marginTop: '1rem',
            marginLeft: '1rem'
          }}
          >
          Login
        </Button>
      </Center>
  </React.Fragment>
  );
}