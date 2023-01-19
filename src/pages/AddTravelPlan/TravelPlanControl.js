import React, { useMemo, useCallback, useEffect, useState } from "react";

import Typography from "../../components/Typography/Typography";
import TextInputWithGooglePlaces from "../../components/GoogleMaps/TextInputWithGooglePlaces";
import { NumberInput } from "../../components/Form/Form";
import Box from "../../components/Box/Box";

import useTheme from '../../hooks/useTheme';
import useGoogleApi from "../../hooks/useGoogleApi";

export default function TravelPlanControl(props) {
  const { colors } = useTheme();
  const { api } = useGoogleApi();

  const onPlaceChange = (autocomplete) => {
    const place = autocomplete.getPlace();
    
    api.map.panTo({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
  }
  
  const onOriginPlaceChange = (autocomplete) => {
    const place = autocomplete.getPlace();
    console.log(place);
    const latlng = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    // console.log(place.photos[0].getUrl());

    // console.log(api.getMap());

    api.map.panTo(latlng);

    props.setOrigin({
      latlng,
      country: place.address_components.find(location => location.types.includes('country')),
      city: place.address_components.find(location => location.types.includes('locality') || location.types.includes('postal_town') || location.types.includes('administrative_area_level_3')),
      formattedAddress: place.formatted_address,
      placeId: place.placeId
    })
  };

  const onDistanceChange = (e) => {
    props.setMaxTravelDistance(e.target.value);
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
          autocompleteInstance={api.autocomplete.geo} 
          onPlaceChange={onOriginPlaceChange}
          defaultLocation={props.placeOrigin}
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
          autocompleteInstance={api.autocomplete.center} 
          onPlaceChange={onPlaceChange}
          defaultLocation={props.placeCenter}
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
          value={props.maxTravelDistance}
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