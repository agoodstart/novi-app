import React from 'react';
import { useNavigate } from 'react-router-dom';

import useTheme from '../../hooks/useTheme';

import { Image } from '../../components/Media/Media';
import Button from '../../components/Button/Button';
import Typography from '../../components/Typography/Typography';
import Center from '../../components/Center/Center';

export default function NotFound() {
  const {colors } = useTheme();
  const navigate = useNavigate();

  console.log('Not found page rendered');
  return (
    <React.Fragment>
      <Image coverPage source="/assets/strand.jpg" />

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
        onClick={() => navigate('/')}
        customStyles={{
          marginTop: '1rem',
          width: '100%'
        }}
        >
          Back to Home
        </Button>
      </Center>
    </React.Fragment>
  );
}