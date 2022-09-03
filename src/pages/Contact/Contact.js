import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';

import { Image } from '../../components/Media/Media';
import Button from '../../components/Button/Button';
import Typography from '../../components/Typography/Typography';
import Box from '../../components/Box/Box';
import Center from '../../components/Center/Center';
import Form, { FormControl, TextInput, EmailInput } from '../../components/Form/Form';

import useTheme from '../../hooks/useTheme';

export default function Contact() {
  const {colors } = useTheme();
  const navigate = useNavigate();

  const inputStyle = {
    borderRadius: '20px',
    border: '1px solid rgba(0, 0, 0, .20)',
    width: '25rem'
  }

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

          <Box flexDirection={"row"}>
            <FontAwesomeIcon size='8x' icon={faAt} />

            <Box flexDirection={"column"}>
              <Form>
                <FormControl>
                  <TextInput customStyles={inputStyle} placeholder="First Name" />
                </FormControl>
                
                <FormControl>
                  <TextInput customStyles={inputStyle} placeholder="Last Name" />
                </FormControl>

                <FormControl>
                  <EmailInput customStyles={inputStyle} placeholder="Your Email" />
                </FormControl>
    

              </Form>
            </Box>
          </Box>
        </Box>
      </Center>
    </React.Fragment>
  );
}