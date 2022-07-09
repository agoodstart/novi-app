import { useState, useEffect } from "react";
import useGoogleApi from "../../hooks/useGoogleApi";

export default function Marker({onDragend, index, ...options}) {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if(!marker) {
      setMarker(new google.maps.Marker());
    }

    return () => {
      if(marker) {
        marker.setMap(null);
      }
    }
  }, [marker]);

  useEffect(() => {
    if(marker) {
      marker.setOptions(options)
    }
  }, [marker, options])

  useEffect(() => {
    if(onDragend && marker) {
      google.maps.event.clearInstanceListeners(marker);
    }

    if(marker) {
      marker.addListener("dragend", (e) => onDragend(e))
    }
  }, [marker, onDragend])

  return null;
}

const withConfig = (customIcon, isDraggable) => ({onDragend, marker}) => {
  const { api } = useGoogleApi();

  const triggerDragend = (e) => {
    onDragend(e, marker.placeId);
  }

  return <Marker map={api.map} icon={customIcon} onDragend={triggerDragend} position={marker.latlng} draggable={isDraggable} />
}

export const OriginMarker = withConfig('http://maps.google.com/mapfiles/kml/paddle/red-stars.png', true);
export const DestinationMarker = withConfig('http://maps.google.com/mapfiles/kml/paddle/red-circle.png', false);