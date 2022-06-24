

export default function TravelPlanDestinations() {
  
  const showWarning = (address) => {
    toast.warn(`${address} is not within the specified travel distance range`);
  }

  const updateChosen = (d) => {
    if(d.index === chosen.index) {
      setChosen({})
    } else {
      setChosen(d);
    }
  }

  const updateMarkerInfo = (temp, distance, marker) => {
    setDestinations(destinations.map(destination => {
      if(destination.index === marker.index) {
        destination.distance = parseFloat(distance);
        destination.temperature = temp;
      }

      return destination;
    }))
  }

  const onLocationCenter = (destinationMarker) => {
    api.map.panTo(destinationMarker.latlng);
  }

  const onLocationRemove = (destinationMarker) => {
    console.log(destinations);
    setDestinations(destinations.filter(destination => destination.index !== destinationMarker.index))
  }

  return (
    <div className={styles['locations']}>
    {destinations.map((destination, i) => (
      <div className={styles['location']} ref={locationRef} style={{
        gridArea: gridPosition
      }} onClick={changeColor}>
        <div className={styles['location__info']}>
          <Typography variant="paragraph">
            {destination.addr || ""}
          </Typography>
          <p>Temperature: {destination.temperature} &#8451;</p>
          <p>Distance: {destination.distance} km</p>
        </div>
        <div className={styles['location__buttons']}>
        <Button 
            color={colors.tertiary.dark}
            variant="contained"
            size="small"
            boxShadow="light"
            onClick={onCenter.bind(this, destination)}
            customStyles={{
              marginRight: '10px',
              zIndex: '9999'
            }}
            >
              <FontAwesomeIcon icon={faLocationCrosshairs} />
          </Button>
  
          <Button 
            color={colors.secondary.medium}
            variant="contained"
            size="small"
            boxShadow="light"
            onClick={onRemove.bind(this, destination)}
            customStyles={{
              zIndex: '9999'
            }}
            >
              <FontAwesomeIcon icon={faXmark} />
          </Button>
        </div>
      </div>
  ))}
  </div>
  )
}