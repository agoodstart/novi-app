import React from "react";
import { Icon } from '@iconify/react';
import locationIcon from '@iconify/icons-mdi/map-marker';

export default function Marker(props) {
  console.log(props);

  const pinSize = {
    fontSize: '6rem',
    color: 'darkgoldenrod'
  }

  const positioning = {
    position: 'absolute',
    transform: 'translate(-50%, -90%)',
  }

  return (
    <div style={positioning}>
        <Icon icon={locationIcon} style={pinSize} />
    </div>
  )
}