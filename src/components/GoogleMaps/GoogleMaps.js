import React, { useRef, useEffect, useState, useMemo } from "react";
import { createCustomEqual } from "fast-equals";
import styles from './GoogleMaps.module.scss';
import useLocation from "../../hooks/useLocation";

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
  onBoundsChange, 
  onCenterChange, 
  onClick, 
  onContextMenu,
  onDoubleClick,
  onDrag,
  onDragStart,
  onDragEnd,
  onHeadingChange,
  onIdle, 
  onMouseMove, 
  onMouseOut,
  onMouseOver,
  onTilesLoad,
  onTiltChange,
  onZoomChange,

  defaultCenter, 
  defaultZoom,
  children, 
  ...options
}) {
  const ref = useRef(null);
  const [map, setMap] = useState();

  const location = useLocation();
  const netherlands = { lat: 52.132633, lng: 5.2912659}

  const currentCenter = useMemo(() => {
    if(defaultCenter) {
      return defaultCenter;
    }

    let deviceLocation = location.getDeviceLocation();

    if(deviceLocation) {
      return deviceLocation
    } else {
      return netherlands
    }
  }, [])

  useEffect(() => {
    if (ref.current && !map) {
      setMap(new google.maps.Map(ref.current, {
        center: currentCenter,
        zoom: defaultZoom || 14,
      }));
    }
  }, [ref, map])

  useDeepCompareEffectForMaps(() => {
    if(map) {
      map.setOptions(options);
    }
  }, [map, options])

  useEffect(() => {
    if (map) {
      [
        "bounds_changed", 
        "center_changed", 
        "click",
        "contextmenu", 
        "dblclick", 
        "drag", 
        "dragstart", 
        "dragend", 
        "heading_changed",
        "idle",
        "mousemove",
        "mouseout",
        "mouseover",
        "tilesloaded",
        "tilt_changed",
        "zoom_changed"
      ].forEach((eventName) =>
        google.maps.event.clearListeners(map, eventName)
      );

      if(onBoundsChange) {
        console.log('je moeder')
        map.addListener("bounds_changed", () => onBoundsChange(map))
      }

      if(onCenterChange) {
        map.addListener("center_changed", () => onCenterChange(map))
      }

      if (onClick) {
        map.addListener("click", (e) => onClick(e, map));
      }

      if (onContextMenu) {
        map.addListener("contextmenu", (e) => onContextMenu(e, map))
      }

      if (onDoubleClick) {
        map.addListener("dblclick", (e) => onDoubleClick(e, map))
      }

      if (onDrag) {
        map.addListener("drag", () => onDrag(map))
      }

      if (onDragStart) {
        map.addListener("dragstart", () => onDragStart(map))
      }

      if (onDragEnd) {
        map.addListener("dragend", () => onDragEnd(map))
      }

      if (onHeadingChange) {
        map.addListener("heading_changed", () => onHeadingChange(map))
      }

      if (onIdle) {
        map.addListener("idle", () => onIdle(map));
      }

      if (onMouseMove) {
        map.addListener("mousemove", () => onMouseMove(map))
      }

      if (onMouseOut) {
        map.addListener("mouseout", () => onMouseOut(map))
      }

      if (onMouseOver) {
        map.addListener("mouseover", () => onMouseOver(map))
      }

      if (onTilesLoad) {
        map.addListener("tilesloaded", () => onTilesLoad(map))
      }

      if (onTiltChange) {
        map.addListener("tilt_changed", () => onTiltChange(map))
      }

      if (onZoomChange) {
        map.addListener("zoom_changed", () => onZoomChange(map))
      }
    }
  }, [
    map, 
    onBoundsChange,
    onCenterChange,
    onClick, 
    onContextMenu,
    onDoubleClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onHeadingChange,
    onIdle,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onTilesLoad,
    onTiltChange,
    onZoomChange
  ]);

  const mapSize = {
    borderRadius: '20px',
    // boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
  }

  return (
    <>
      <div ref={ref} style={mapSize} className={styles['maps']}  />
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map });
        }
      })}
    </>
  )
}