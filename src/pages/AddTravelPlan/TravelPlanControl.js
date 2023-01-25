import React, {useCallback} from "react";

import Typography from "../../components/Typography/Typography";
import TextInputWithGooglePlaces from "../../components/GoogleMaps/TextInputWithGooglePlaces";
import { NumberInput } from "../../components/Form/Form";
import Box from "../../components/Box/Box";

import useTheme from '../../hooks/useTheme';
import useGoogleApi from "../../hooks/useGoogleApi";
import useAmadeusApi from '../../hooks/useAmadeusApi';

const capitalize = (str) => {
  return str.replace(/^(\w)(.+)/, (_match, p1, p2) => p1.toUpperCase() + p2.toLowerCase())
}

export default function TravelPlanControl({
  states,
  dispatch
}) {
  const { colors } = useTheme();
  const 
  { 
    map, 
    autocompleteGeo, 
    createAutocompleteGeo, 
    autocompleteCenter,
    createAutocompleteCenter 
  } = useGoogleApi();
  const { getLocationsInRadius } = useAmadeusApi();


  const onPlaceChange = async (autocomplete) => {
    try {
      const place = autocomplete.getPlace();

      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      
      map.panTo(latlng)
      // const lockedLocations = await getLocationsInRadius(latlng.lat, latlng.lng);
  
      // const newLocations = lockedLocations.map(location => ({
      //   latlng: {
      //     lat: location.geoCode.latitude,
      //     lng: location.geoCode.longitude
      //   },
      //   formattedAddress: `${capitalize(location.address.cityName)}, ${capitalize(location.address.countryName)}`,
      //   outsideTravelDistance: location.distance.value > states.maxTravelDistance 
      // }));
        
      dispatch({
        type: 'map_center_changed',
        payload: {
          latlng: latlng,
          formattedAddress: place.formatted_address,
          lockedDestinations: [],
        }
      })
    } catch(err) {
      console.error(err);
    }
  };
  
  const onOriginPlaceChange = async (autocomplete) => {
    try {
      const place = autocomplete.getPlace();
      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };

      map.panTo(latlng);
      
      dispatch({
        type: 'map_origin_changed',
        payload: {
          country: place.address_components.find(location => location.types.includes('country')),
          city: place.address_components.find(location => location.types.includes('locality') || location.types.includes('postal_town') || location.types.includes('administrative_area_level_3')),
          latlng: latlng,
          formattedAddress: place.formatted_address,
          placeId: place.placeId,
          lockedDestinations: [],
        }
      })
    } catch(err) {
      console.error(err);
    }
    // console.log(place.photos[0].getUrl());
  };

  const onDistanceChange = (e) => {
    dispatch({
      type: 'traveldistance_changed',
      payload: {
        maxTravelDistance: e.target.value
      }
    })
  }

  return (
    <Box flexDirection="row" borderRadius={5} padding={10} backgroundColor={colors.background.white.alpha['60']}>
      <Box flexDirection="column" width={30} customStyles={{
        flexGrow: "1"
      }}>
        <Typography variant="xl" fontWeight={300} customStyles={{
              marginLeft: '5px'
          }}>
            Your current location: 
        </Typography>

        <TextInputWithGooglePlaces 
          autocompleteInstance={{
            autocomplete: autocompleteGeo,
            createAutocomplete: createAutocompleteGeo,
          }} 
          onPlaceChange={onOriginPlaceChange}
          defaultLocation={states.placeOrigin}
          types={['(cities)']}
          customStyles={{
            borderRadius: "3px",
            backgroundColor: "#11151C10",
            height: "100%",
            fontSize: "1.1rem",
            fontWeight: "300"
          }}
        />
      </Box>

      <Box flexDirection="column" width={30} customStyles={{
        marginLeft: "5px",
        flexGrow: "1"
      }}>
        <Typography variant="xl" fontWeight={300} customStyles={{
            marginLeft: '5px'
          }}>
            Current center: 
        </Typography>
        <TextInputWithGooglePlaces 
          autocompleteInstance={{
            autocomplete: autocompleteCenter,
            createAutocomplete: createAutocompleteCenter,
          }} 
          onPlaceChange={onPlaceChange}
          defaultLocation={states.placeCenter}
          types={['(cities)']}
          customStyles={{
            borderRadius: "3px",
            backgroundColor: "#11151C10",
            height: "100%",
            fontSize: "1.1rem",
            fontWeight: "300"
          }}
        />
      </Box>

      <Box flexDirection="column" width={30} customStyles={{
        marginLeft: "5px"
      }}>
        <Typography variant="xl" fontWeight={300} customStyles={{
          marginLeft: '5px'
        }}>
          Max travel distance
        </Typography>
        <NumberInput 
          value={states.maxTravelDistance}
          onChange={onDistanceChange}
          customStyles={{
            borderRadius: "3px",
            backgroundColor: "#11151C10",
            height: "100%",
            fontSize: "1.1rem",
            fontWeight: "300"
          }}
        />
      </Box>
    </Box>
  )
}