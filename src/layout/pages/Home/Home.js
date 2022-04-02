import React from 'react';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Typography from '../../components/Typography/Typography';
import styles from './Home.module.scss';

export default function Home() {
  console.log('home route rendered');
    return (
      <React.Fragment>
        <Header>
          <Navbar />
        </Header>
        <div className={styles['bg-video']}>
          <video className={styles['bg-video__content']} autoPlay muted loop>
            {/* <source src="/assets/coastline.mp4" type="video/mp4" /> */}
            <source src="/assets/citynight.mp4" type="video/mp4" />
            Your browser is not supported!
          </video>
        </div>

        <div className={styles['center__div']}>
          <Typography variant="h1">
            There is a world outside waiting for you
          </Typography>

          <a href="" className={styles['btn']}>Login to discover</a>
        </div>
      </React.Fragment>
    );
  }