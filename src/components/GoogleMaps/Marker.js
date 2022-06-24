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

const withConfig = (customIcon) => ({onDragend, marker}) => {
  const { api } = useGoogleApi();

  const triggerDragend = (e) => {
    onDragend(e, marker.id);
  }

  return <Marker map={api.map} icon={customIcon} onDragend={triggerDragend} position={marker.latlng} draggable={true} />
}

export const OriginMarker = withConfig('http://maps.google.com/mapfiles/kml/paddle/red-stars.png');
export const DestinationMarker = withConfig('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');