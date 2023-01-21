import { useState, useEffect } from "react";
import useGoogleApi from "../../hooks/useGoogleApi";
import { faCircle, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Marker({
  onClick, 
  showInfoWindow,

  map,
  icon,
  location
}) {
  const [marker, setMarker] = useState();
  const [infoWindow, setInfoWindow] = useState();

  useEffect(() => {
    if(!marker) {
      setMarker(new google.maps.Marker());
      setInfoWindow(new google.maps.InfoWindow());
    }

    return () => {
      if(marker) {
        marker.setMap(null);
        infoWindow.setMap(null);
      }
    }
  }, [marker]);

  useEffect(() => {
    if(marker) {
      marker.setOptions({
        map,
        icon,
        position: location.latlng,
        draggable: false
      })
    }
  }, [marker, map, icon, location])

  useEffect(() => {
    if(infoWindow && marker) {
      infoWindow.setOptions({
        position: location.latlng,
        disableAutoPan: true,
        content: 
        `<div id="content">
          <h1 id="firstHeading" class="firstHeading">${location.formattedAddress}</h1>
        </div>`
      });
    }
  }, [infoWindow, location])

  useEffect(() => {
    if(marker) {
      google.maps.event.clearInstanceListeners(marker);
    }

    if(showInfoWindow && marker) {
      marker.addListener("mouseover", () => {     
        infoWindow.open({
          anchor: marker,
          map: map,
          shouldFocus: false
        }) 
      });

      marker.addListener("mouseout", () => { 
        infoWindow.close() 
      })
    }

    if(onClick && marker) {
      marker.addListener("click", () => onClick(location))
    }
  }, [marker, infoWindow, onClick])

  return null;
}

export const OriginMarker = ({location}) => {
  const { api } = useGoogleApi();

  return <Marker 
    map={api.map} 
    icon={{
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
    }} 
    location={location} />
};

export const DestinationMarker = ({location, onClick}) => {
  const { map } = useGoogleApi();

  const triggerClickEvent = (location) => {
    onClick(location);
  }

  return <Marker 
    map={map} 
    icon={{
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
    }} 
    onClick={triggerClickEvent} 
    showInfoWindow={true}
    location={location}
    />
}