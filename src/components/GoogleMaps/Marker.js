import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationPin } from '@fortawesome/free-solid-svg-icons';

export default function Marker({lat, lng, key}) {
  const customStyles = {
    // position: 'relative',
    // transform: 'translate(50%, -50%)',
  }

  const positioning = {
    // width: '100px',
    // height: '100px',
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
  }

  return (
    <div lat={lat} lng={lng} key={key} style={positioning}>
        <FontAwesomeIcon icon={faLocationPin} size="4x" />
    </div>
  )
}