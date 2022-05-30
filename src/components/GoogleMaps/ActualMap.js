import React, { useRef, useEffect, useState } from "react";
import { createCustomEqual } from "fast-equals";

// deepCompare compares nested objects, like the map instance
const deepCompareEqualsForMaps = createCustomEqual((deepEqual) => (a, b) => {
  return deepEqual(a, b)
});

const useDeepCompareMemoize = (value) => {
  const ref = useRef();

  if (!deepCompareEqualsForMaps(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

const useDeepCompareEffectForMaps = (callback, dependencies) => {
  useEffect(callback, dependencies.map(useDeepCompareMemoize))
}

export default function ActualMap({onClick, onIdle, onZoomChanged, children, ...options}) {
  const ref = useRef(null);
  const [map, setMap] = useState();

  useEffect(() => {
    console.log('test');
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map])

  useDeepCompareEffectForMaps(() => {
    if(map) {
      console.log('bruh');
      map.setOptions(options);
    }
  }, [map, options])

  useEffect(() => {
    if (map) {
      ["click", "idle", "zoom_changed"].forEach((eventName) =>
        window.google.maps.event.clearListeners(map, eventName)
      );
      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }
    }
  }, [map, onClick, onIdle]);

  useEffect(() => {
    if(map) {
      window.google.maps.event.clearListeners(map, "zoom_changed");

      if(onZoomChanged) {
        map.addListener("zoom_changed", onZoomChanged)
      }
    }
  }, [map, onZoomChanged])

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