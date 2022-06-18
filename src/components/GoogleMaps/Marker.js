import { useState, useEffect } from "react";

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
    // console.log('index: ', index)
    if(marker) {
      marker.addListener("dragend", (e) => onDragend(e, index))
    }
  }, [marker])

  useEffect(() => {
    console.log('index: ', index)
  }, [])

  return null;
}