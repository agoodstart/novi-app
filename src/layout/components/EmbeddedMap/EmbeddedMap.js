import React from 'react';
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

export default function EmbeddedMap() {
  console.log(REACT_APP_GOOGLE_MAPS_API_KEY)

  const customStyle = {
    border: '0',
  }

  return (
    <iframe
    width="450"
    height="250"
    frameBorder="0" style={customStyle}
    referrerPolicy="no-referrer-when-downgrade"
    src={`https://www.google.com/maps/embed/v1/MAP_MODE?key=${REACT_APP_GOOGLE_MAPS_API_KEY}&PARAMETERS`}
    allowFullScreen>
  </iframe>
  )
}