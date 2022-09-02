import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';

import { Image } from '../../components/Media/Media';
import Button from '../../components/Button/Button';
import Typography from '../../components/Typography/Typography';
import Box from '../../components/Box/Box';
import Center from '../../components/Center/Center';

import useTheme from '../../hooks/useTheme';

export default function Contact() {
  const {colors } = useTheme();
  const navigate = useNavigate();

  console.log('Not found page rendered');
  return (
    <React.Fragment>
      <Image coverPage source="/assets/mountains3.jpg" />

      <Center>
        <Box backgroundColor={colors.background.white.main} borderRadius={10} elevation={3} padding={20}>
          <Typography 
            variant="h1" 
            customStyles={{
              marginTop: '1rem'
            }}>Contact Us
          </Typography>

          <Box>
          <Typography 
            variant="h1"
          >
            <FontAwesomeIcon height={200} icon={faAt} />
          </Typography>

          
          </Box>
        </Box>
      </Center>
    </React.Fragment>
  );
}