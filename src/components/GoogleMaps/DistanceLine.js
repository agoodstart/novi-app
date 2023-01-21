import { useState, useEffect } from "react";
import useGoogleApi from "../../hooks/useGoogleApi";

export default function Line({...options}) {
  const [line, setLine] = useState();

  useEffect(() => {
    if(!line) {
      setLine(new google.maps.Polyline());
    }

    return () => {
      if(line) {
        line.setMap(null);
      }
    }
  }, [line]);

  useEffect(() => {
    if(line) {
      line.setOptions(options)
    }
  }, [line, options])

  return null;
}

export const DistanceLine = ({pointToPoint}) => {
  const { api } = useGoogleApi();

  const lineSymbol = {
    path: "M 0,-1 0,1",
    strokeOpacity: 1,
    scale: 3,
  };

  return <Line map={api.map} path={pointToPoint} strokeOpacity={0} icons={[
    {
      icon: lineSymbol,
      offset: "0",
      repeat: "25px"
    }
  ]} />
}