import React from "react";

import Typography from "../../components/Typography/Typography"

import { useNavigate } from "react-router-dom";
import useTheme from "../../hooks/useTheme";
import useLocalStorage from "../../hooks/useLocalStorage";

import styles from './Destinations.module.scss';
import Button from "../../components/Button/Button";
import Destination from "./Destination/Destination";

export default function Destinations() {
  console.log('hello')
  const navigate = useNavigate();
  const {colors} = useTheme();
  const [destinations, _] = useLocalStorage("destinations", []);

  const viewDestination = (destination) => {
    navigate(`/destinations/destination/${destination.placeId}`, { 
      state: destination
     })
  }

  console.log(styles['destinations__headline']);

  return (
    <React.Fragment>

      <div className={styles['destinations__headline']}>
        <Typography textColor={colors.grey.dark} variant="h1">Your Destinations</Typography>
      </div>

      <div className={styles['destinations__divider']} />

      <div className={styles['destinations__list']}>
        {!destinations.length ? 
        <Typography variant="h2" textColor={colors.grey.medium}>There are no destinations set yet</Typography> :
        destinations.map((destination, i) => (
          <div key={i} className={styles['destination']}>
            <Typography variant="h4" customStyles={{ paddingLeft: '15px' }}>
              {destination.formattedAddress}
            </Typography>

            <div className={styles['destination__buttons']}>
              <Button color={colors.primary.gradient.half} customStyles={{ marginRight: '20px' }} onClick={viewDestination.bind(null, destination)}>
                View Destination
              </Button>

              <Button color={colors.secondary.gradient.half}>
                Remove Destination
            </Button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}