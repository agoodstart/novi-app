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
  const [autocompleteCenter, setAutocompleteCenter] = useState();
  const [autocompleteGeo, setAutocompleteGeo] = useState();
  const [geocoder, setGeocoder] = useState();

  const createMap = (refEl, options = {}) => {
    setMap(new google.maps.Map(refEl, options))
  } 

  const getMap = () => {
    return map;
  }

  const unsetMap = () => {
    setMap(null);
  }
  
  const createAutocompleteCenter = (refEl, options = {}) => {
    setAutocompleteCenter(new google.maps.places.Autocomplete(refEl, options))
  }

  const createAutocompleteGeo = (refEl, options = {}) => {
    setAutocompleteGeo(new google.maps.places.Autocomplete(refEl, options))
  }
  
  const createGeocoder = () => {
    setGeocoder(new google.maps.Geocoder());
  }

  const getGeocodedAddress = (latlng) => {
    return new Promise((resolve, reject) => {
      geocoder
        .geocode({ location: latlng }, (results, status) => {
          if (status == 'OK') {
            resolve(results);
          } else {
            reject(status)
          }
        })
    }).then(results => {
      console.log(results);
      const locationMatch = results.reduce((res, location) => {
        if(location.types.includes('locality') || 
        location.types.includes('postal_town')) {
          res = location;
        };
        
        return res;
      }, null);

      console.log(locationMatch.address_components.find(location => location.types.includes('locality') || location.types.includes('postal_town') || location.types.includes('administrative_area_level_2 ')));

        if(!locationMatch) {
          return Promise.reject('cannot resolve address');
        } else {
          return Promise.resolve({
            country: locationMatch.address_components.find(location => location.types.includes('country')),
            city: locationMatch.address_components.find(location => location.types.includes('locality') || location.types.includes('postal_town') || location.types.includes('administrative_area_level_3')),
            formattedAddress: locationMatch.formatted_address,
            placeId: locationMatch.place_id,
          })
        }
      },
      err => {
        console.log('error')
      })
  }
  
  useEffect(() => {
    if(geocoder) {
      // console.log('geocoder is set!')
    }
  }, [geocoder])
  
  useEffect(() => {
    if(map) {
      // console.log('map is set!');
    }
  }, [map])

  const api = {
    map,
    createMap,
    getMap,

    geocoder,
    getGeocodedAddress,

    autocomplete: {
      geo: {
        autocomplete: autocompleteGeo,
        createAutocomplete: createAutocompleteGeo
      },

      center: {
        autocomplete: autocompleteCenter,
        createAutocomplete: createAutocompleteCenter
      }
    },
  }

  const checkStatus = (status, loader) => {
    if(status === 'SUCCESS') {
      createGeocoder();
    }
  }

  return (
      <GoogleApiContext.Provider value={{ map, createMap, api }}>
        <Wrapper apiKey={REACT_APP_GOOGLE_MAPS_API_KEY} render={render} libraries={["places"]} callback={checkStatus}  >
          {children}
        </Wrapper>
      </GoogleApiContext.Provider>
  )
};