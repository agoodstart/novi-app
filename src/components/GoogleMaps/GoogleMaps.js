import React, { useRef, useEffect } from "react";
import { createCustomEqual } from "fast-equals";
import useGoogleApi from "../../hooks/useGoogleApi";

import styles from './GoogleMaps.module.scss';

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

export default function GoogleMaps({ 
  onClick, 
  onIdle, 
  onMouseMove, 
  onZoomChange,
  onDragend,

  onMapsLoaded,

  defaultCenter, 
  children, 

  customClassname,

  ...options
}) {
  const { map, createMap, placesService, createPlacesService } = useGoogleApi();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && !map) {
      createMap(ref.current);
    }
  }, [ref, map])

  useDeepCompareEffectForMaps(() => {
    if(map) {
      map.setOptions(
        {center: defaultCenter , ...options}
      );
    }
  }, [map, options])

  useEffect(() => {
    if(ref.current && map) {
      createPlacesService();
    }
  }, [ref, map])

  useEffect(() => {
    if (map) {
      [
        "click",
        "idle",
        "mousemove",
        "zoom_changed",
        "dragend"
      ].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if (onClick) {
        map.addListener("click", onClick);
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }

      if (onDragend) {
        map.addListener("dragend", () => onDragend(map));
      }

      if (onMouseMove) {
        map.addListener("mousemove", () => onMouseMove(map))
      }

      if (onZoomChange) {
        map.addListener("zoom_changed", () => {
          onZoomChange(map)
        })
      }
    }
  }, [
    map, 
    onClick, 
    onIdle,
    onMouseMove,
    onZoomChange
  ]);

  const mapSize = {
    height: '100%',
    border: "none"
  }

  return (
    <>
      <div ref={ref} style={mapSize} className={styles['maps']}  />
      {children}
    </>
  )
}