import React from 'react';
import { useNavigate } from 'react-router-dom';

import useTheme from '../../hooks/useTheme';

import Image from '../../components/Image/Image'
import Button from '../../components/Button/Button';
import Typography from '../../components/Typography/Typography';
import Center from '../../components/Center/Center';


export default function NotFound() {
  const {colors } = useTheme();
  const navigate = useNavigate();

  console.log('Not found page rendered');
  return (
    <React.Fragment>
      <Image customStyles={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: '0',
        left: '0'
      }} source="/assets/strand.jpg" />

      <Center>
      <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h1">
        Whoops... <br></br> 
        It looks like you've stranded <br></br>
      </Typography>

      <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h2">
        this page does not exist
      </Typography>
      
      <Button 
        color={colors.background.primary.main}
        size="large"
        elevation="2"
        onClick={() => navigate(-1)}
        customStyles={{
          marginTop: '1rem'
        }}
        >
          Back to Home
        </Button>
      </Center>
    </React.Fragment>
  );
}