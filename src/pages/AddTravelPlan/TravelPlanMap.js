import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';
import { DestinationMarker, OriginMarker } from '../../components/GoogleMaps/Marker';
import Box from '../../components/Box/Box';

import useGoogleApi from '../../hooks/useGoogleApi';
import mapStyles from '../../helpers/mapStyles';

import { DistanceLine } from '../../components/GoogleMaps/DistanceLine';
import Typography from '../../components/Typography/Typography';

export default function TravelPlanMap({
  states,
  dispatch,
  deviceLocation,
  createNewDestination
}) {
  const userLocation = useMemo(() => {
    return deviceLocation.read();
  }, []);

  const 
  { 
    placesService, 
    map, 
    unsetMap,
    getGeocodedAddress 
  } = useGoogleApi();

  const [pointToPoint, setPointToPoint] = useState(null);

  const beforeMapsLoad = useCallback(async (userLocation) => {
    const locationInfo = await getGeocodedAddress(userLocation);
    dispatch({
      type: 'map_origin_changed',
      payload: {
        formattedAddress: locationInfo.formattedAddress ?? "",
        city: locationInfo.city,
        country: locationInfo.country,
        latlng: userLocation,
        placeId: locationInfo.placeId,
      },
    });
  }, [])

  useEffect(() => {
    beforeMapsLoad(userLocation);

    return () => {
      unsetMap();
    }
  }, [beforeMapsLoad]);

  const onMarkerClick = async (destination) => {
    let request = {
      query: destination.formattedAddress,
      fields: ['name', 'formatted_address', 'geometry', 'place_id', 'plus_code', 'types']
    }

    placesService.findPlaceFromQuery(request, async (results, status) => {
      if (status === "OK") {
        let latlng = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }

        let [city, country] = results[0].formatted_address.split(", ");
        let formattedAddress = results[0].formatted_address;
        let placeId = results[0].place_id;

        if (states.chosenDestinations.some(destination => destination.placeId === placeId)) {
          toast.warn(`${formattedAddress} is already present in the list`)
        } else {
          await createNewDestination(latlng, {
            country,
            city,
            formattedAddress,
            placeId
          });
        }
      } else {
        toast.warn("Unable to get location");
      }
    });

    setPointToPoint([destination.latlng, states.origin.latlng]);
  }

  const onZoomChange = () => {
    dispatch({
      type: 'map_zoomed',
      payload: {
        mapZoom: map.getZoom(),
      }
    })
  }

  const onDragEnd = () => {
    const latlng = map.getCenter().toJSON();
    dispatch({
      type: 'map_center_changed',
      payload: {
        mapCenter: latlng
      }
    })
  }

  return (
    <Box borderRadius={5}>
      {Object.keys(states.origin).length !== 0 ? <GoogleMaps
        onDragend={onDragEnd}
        onZoomChange={onZoomChange}
        zoom={states.mapZoom}
        disableDefaultUI={true}
        zoomControl={true}
        scrollwheel={false}
        zoomControlOptions={{
          style: google.maps.ZoomControlStyle.SMALL
        }}
        defaultCenter={states.mapCenter}
        styles={mapStyles}
      >
        <OriginMarker location={states.origin} />
        {states.lockedDestinations.map((destination, i) => (
          <DestinationMarker onClick={onMarkerClick} location={destination} key={i} />
        ))}
        {pointToPoint ? <DistanceLine pointToPoint={pointToPoint} /> : null}
      </GoogleMaps> : <Typography>Setting origin data...</Typography>}
    </Box>
  )
}