import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEarthEurope, faGauge } from '@fortawesome/free-solid-svg-icons';

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

            <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h1" customStyles={{ lineHeight: '1.4'}}>
              There is a world outside <br></br> 
              waiting for you
            </Typography>
          }

          {user ? 
            <Button 
            type="button"
            color={colors.background.tertiary.main}
            size="large"
            pill
            elevation="2"
            onClick={() => { navigate('/dashboard') }}
            customStyles={{ marginTop: '2.5rem'}}
            >
              <FontAwesomeIcon icon={faGauge} /> &nbsp;
              To your dashboard
            </Button> :

            <Button 
            type="button"
            color={colors.background.primary.main}
            size="large"
            pill
            elevation="2"
            onClick={handleOpenModal}
            customStyles={{ marginTop: '2.5rem'}}
            >
              <FontAwesomeIcon icon={faEarthEurope} /> &nbsp;
              Login to discover
            </Button>
          }
        </Center>
      </React.Fragment>
    );
  }