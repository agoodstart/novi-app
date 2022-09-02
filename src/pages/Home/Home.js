import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';
import useLocalStorage from '../../hooks/useLocalStorage';

import Button from '../../components/Button/Button';
import Center from '../../components/Center/Center';
import Typography from '../../components/Typography/Typography';
import { Video } from '../../components/Media/Media';

export default function Home() {
  const navigate = useNavigate();
  const { modalRef, auth } = useAuth();
  const {colors } = useTheme();
 
  const [user, _setUser] = useLocalStorage("user", null);

  const handleOpenModal = () => {
    modalRef.current.openModal();
  }

  useEffect(() => {
    auth.testConnection();
  }, [])

    return (
      <React.Fragment>
        <Video coverPage source={"/assets/coastline.mp4"} />

        <Center>
          {user ? 
            <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h1">
              It is nice to have you back
            </Typography> :

            <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h1">
              There is a world outside <br></br> 
              waiting for you
            </Typography>
          }

          {user ? 
            <Button 
            color={colors.background.tertiary.main}
            size="large"
            pill
            elevation="2"
            onClick={() => { navigate('/dashboard') }}
            customStyles={{ marginTop: '1rem'}}
            >
              To your dashboard
            </Button> :

            <Button 
            color={colors.background.primary.main}
            size="large"
            pill
            elevation="2"
            onClick={handleOpenModal}
            customStyles={{ marginTop: '1rem'}}
            >
              Login to discover
            </Button>
          }
        </Center>
      </React.Fragment>
    );
  }