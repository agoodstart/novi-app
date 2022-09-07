import React from 'react';

import { Image } from '../../components/Media/Media';
import Button from '../../components/Button/Button';
import Typography from '../../components/Typography/Typography';
import Box from '../../components/Box/Box';
import Center from '../../components/Center/Center';
import Form, { FormControl, TextInput, EmailInput, TextArea } from '../../components/Form/Form';

import useTheme from '../../hooks/useTheme';

export default function Contact() {
  const {colors } = useTheme();

  const inputStyle = {
    borderRadius: '30px',
    border: '1px solid rgba(0, 0, 0, .20)',
  }

  const areaStyle = {
    borderRadius: '15px',
    border: '1px solid rgba(0, 0, 0, .20)'
  }

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

          <Box flexDirection={"row"} alignItems="center">
            <Box flexDirection={"column"}>
              <Form customStyles={{ padding: '2rem', width: '40rem'}}>
                <FormControl>
                  <TextInput size="3x" customStyles={inputStyle} placeholder="First Name" />
                </FormControl>
                
                <FormControl>
                  <TextInput size="3x" customStyles={inputStyle} placeholder="Last Name" />
                </FormControl>

                <FormControl>
                  <EmailInput size="3x" customStyles={inputStyle} placeholder="Your Email" />
                </FormControl>
    
                <FormControl>
                  <TextArea textSize="3x" customStyles={areaStyle} placeholder="Your Questions..." rows={5} />
                </FormControl>

                <Button
                  fullWidth
                  color={colors.background.tertiary.main}>
                    Send Message
                  </Button>
              </Form>
            </Box>
          </Box>
        </Box>
      </Center>
    </React.Fragment>
  );
}