import React, { useEffect } from 'react';

import useTheme from '../../hooks/useTheme';
import useAuth from '../../hooks/useAuth';

import Button from '../../components/Button/Button';
import Center from '../../components/Center/Center';
import Typography from '../../components/Typography/Typography';

import styles from './Home.module.scss';

export default function Home() {
  const { modalRef, auth } = useAuth();
  const {colors } = useTheme();

  const handleOpenModal = () => {
    modalRef.current.openModal();
  }

  useEffect(() => {
    auth.testConnection();
  }, [])

  console.log('home route rendered');
    return (
      <React.Fragment>
        <div className={styles['bg-video']}>
          <video className={styles['bg-video__content']} autoPlay muted loop>
            <source src="/assets/coastline.mp4" type="video/mp4" />
            {/* <source src="/assets/citynight.mp4" type="video/mp4" /> */}
            Your browser is not supported!
          </video>
        </div>

        <Center>
          <Typography textColor={colors.text.white} fontWeight="500" elevation={2} variant="h1">
            There is a world outside <br></br> 
            waiting for you
          </Typography>
          
          <Button 
            color={colors.background.primary.main}
            size="large"
            pill
            elevation="2"
            onClick={handleOpenModal}
            >
              Login to discover
            </Button>
        </Center>
      </React.Fragment>
    );
  }