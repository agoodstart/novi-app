import React from "react";

import Typography from "../../components/Typography/Typography";
import TextInputWithGooglePlaces from "../../components/GoogleMaps/TextInputWithGooglePlaces";
import { NumberInput } from "../../components/Form/Form";
import Box from "../../components/Box/Box";

import useTheme from '../../hooks/useTheme';
import useGoogleApi from "../../hooks/useGoogleApi";

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

  const onInput = (autocomplete, instanceName) => {
    const place = autocomplete.getPlace();

    const latlng = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    
    map.panTo(latlng)

    if(instanceName === 'origin') {
      dispatch({
        type: 'map_origin_changed',
        payload: {
          country: place.address_components.find(location => location.types.includes('country')),
          city: place.address_components.find(location => location.types.includes('locality') || location.types.includes('postal_town') || location.types.includes('administrative_area_level_3')),
          latlng: latlng,
          formattedAddress: place.formatted_address,
          placeId: place.placeId,
        }
      })
    } else {
      dispatch({
        type: 'map_center_changed',
        payload: {
          mapCenter: latlng
        }
      })
    }
  }

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
      <Box flexDirection="column" width={30} customStyles={{ flexGrow: "1" }}>
        <Typography variant="xl" fontWeight={300} customStyles={{ marginLeft: '5px' }}>
            Your current location: 
        </Typography>

        <TextInputWithGooglePlaces 
          autocompleteInstance={{
            autocomplete: autocompleteGeo,
            createAutocomplete: createAutocompleteGeo,
          }}
          instanceName={'origin'}
          onInput={onInput}
          defaultLocation={states.origin.formattedAddress}
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

      <Box flexDirection="column" width={30} customStyles={{ marginLeft: "5px", flexGrow: "1" }}>
        <Typography variant="xl" fontWeight={300} customStyles={{ marginLeft: '5px' }}>
            Where do you want to go?
        </Typography>
        <TextInputWithGooglePlaces 
          autocompleteInstance={{
            autocomplete: autocompleteCenter,
            createAutocomplete: createAutocompleteCenter,
          }} 
          instanceName={'destination'}
          onInput={onInput}
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

      <Box flexDirection="column" width={30} customStyles={{ marginLeft: "5px" }}>
        <Typography variant="xl" fontWeight={300} customStyles={{ marginLeft: '5px' }}>
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