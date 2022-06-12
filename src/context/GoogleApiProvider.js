import { createContext, useState, useEffect, useCallback } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
const { REACT_APP_GOOGLE_MAPS_API_KEY } = process.env;

export const GoogleApiContext = createContext(null);

const render = (status) => {
  switch (status) {
    case 'LOADING':
      return 'loading...';
    case 'FAILURE':
      return 'error!';
    case 'SUCCESS':  
      return 'success!';
  }
}

export const GoogleApiProvider = ({ children }) => {
  const [map, setMap] = useState();
  const [autocomplete, setAutocomplete] = useState();
  const [geocoder, setGeocoder] = useState();

  const createMap = (refEl, options = {}) => {
    setMap(new google.maps.Map(refEl, options))
  } 
  
  const createAutocomplete = (refEl, options = {}) => {
    setAutocomplete(new google.maps.places.Autocomplete(refEl, options))
  }
  
  const createGeocoder = () => {
    setGeocoder(new google.maps.Geocoder());
  }
  
  useEffect(() => {
    if(geocoder) {
      console.log('geocoder is set!')
    }
  }, [geocoder])
  
  useEffect(() => {
    if(autocomplete) {
      console.log('autocomplete is set!')
    }
  }, [autocomplete])
  
  useEffect(() => {
    if(map) {
      console.log('map is set!');
    }
  }, [map])

  const getMap = () => map;
  const getGeocoder = () => geocoder;
  const getAutoComplete = () => autocomplete;

  const api = {
    map,
    geocoder,
    autocomplete,
  }

  const checkStatus = (status, loader) => {
    if(status === 'SUCCESS') {
      createGeocoder();
    }
  }

  return (
      <GoogleApiContext.Provider value={{ map, createMap, autocomplete, createAutocomplete, geocoder, api }}>
        <Wrapper apiKey={REACT_APP_GOOGLE_MAPS_API_KEY} render={render} libraries={["places"]} callback={checkStatus}  >
          {children}
        </Wrapper>
      </GoogleApiContext.Provider>
  )
};