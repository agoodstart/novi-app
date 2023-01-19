import { useState, useEffect } from "react";
import useGoogleApi from "../../hooks/useGoogleApi";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

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

const withConfig = (isDraggable) => ({onDragend, marker}) => {
  const { api } = useGoogleApi();

  const triggerDragend = (e) => {
    onDragend(e, marker.placeId);
  }

  return <Marker map={api.map} icon={{
    path: faCircle.icon[4],
    fillColor: "#11151C",
    fillOpacity: 1,
    anchor: new google.maps.Point(
      faCircle.icon[0] / 2, // width
      faCircle.icon[1] // height
    ),
    strokeWeight: 2,
    strokeColor: "#ffffff",
    scale: 0.035,
  }} onDragend={triggerDragend} position={marker.latlng} draggable={isDraggable} />
}

export const OriginMarker = withConfig(true);

export const DestinationMarker = withConfig(false);