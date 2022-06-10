import { createContext, useState, useEffect } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

export const GoogleApiContext = createContext(null);

export const GoogleApiProvider = ({ children }) => {
  const [map, setMap] = useState();
  const [places, setPlaces] = useState();

  const createMap = (refEl, options = {}) => {
    setMap(new google.maps.Map(refEl, options))
  }

  useEffect(() => {
    if(!map) {
      console.log('map is not set')
    } else {
      console.log('map is set!');
    }
  }, [map])
  


  return (
      <GoogleApiContext.Provider value={{ map, createMap }}>
        <Wrapper apiKey={REACT_APP_GOOGLE_MAPS_API_KEY} render={render} libraries={["places"]} >
          {children}
        </Wrapper>
      </GoogleApiContext.Provider>
  )
};