import { useState, useEffect } from "react";
import useGoogleApi from "../../hooks/useGoogleApi";
import { faCircle, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Marker({onClick, index, ...options}) {
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
    if(onClick && marker) {
      google.maps.event.clearInstanceListeners(marker);
    }

    if(marker) {
      marker.addListener("click", (e) => onClick(e))
    }
  }, [marker, onClick])

  return null;
}

export const OriginMarker = ({marker}) => {
  const { api } = useGoogleApi();

  return <Marker map={api.map} icon={{
    path: faStar.icon[4],
    fillColor: "#11151C",
    fillOpacity: 1,
    anchor: new google.maps.Point(
      faStar.icon[0] / 2, // width
      faStar.icon[1] // height
    ),
    strokeWeight: 2,
    strokeColor: "#ffffff",
    scale: 0.035,
  }} position={marker.latlng} draggable={false} />
};

export const DestinationMarker = ({marker, onClick}) => {
  const { api } = useGoogleApi();

  const triggerClickEvent = () => {
    onClick(marker);
  }

  const triggerMouseOverEvent = (e) => {
    console.log('mouse over');
    console.log(e);
  }

  const triggerMouseOutEvent = (e) => {
    console.log('mouse out');
    console.log(e);
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
  }} onClick={triggerClickEvent} position={marker.latlng} draggable={false} />
}