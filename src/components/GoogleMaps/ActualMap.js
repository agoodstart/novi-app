import React, { useRef, useEffect, useState } from "react";

export default function ActualMap({onClick, children, ...options}) {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map])

  useEffect(() => {
    if(map) {
      console.log('bruh')
      map.setOptions(options);
    }
  }, [map, options])

  useEffect(() => {
    if(map) {
      window.google.maps.event.clearListeners(map, "click")

      if(onClick) {
        map.addListener("click", onClick);
      }
    }
  }, [map, onClick])

  const mapSize = {
    height: '85vh',
    width: '85%'
  }

  return (
    <>
      <div ref={ref} style={mapSize} />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  )
}