import React from "react"

export default function Marker({lat, lng, key}) {
  const customStyles = {
    position: 'relative',
    // transform: 'translate(50%, -50%)',
  }

  const positioning = {
    position: 'absolute',
    transform: 'translate(-50%, -100%)',
  }

  return (
    <div lat={lat} lng={lng} key={key} style={customStyles}>
      <img height="100" style={positioning} src="https://img.favpng.com/8/5/0/google-map-maker-google-maps-computer-icons-png-favpng-62XACGKanLR8PR3P52YHQ7vUB.jpg" />
    </div>
  )
}