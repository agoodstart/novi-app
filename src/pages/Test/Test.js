import {useEffect} from 'react';
import Map from "../../components/Map/Map";

export default function Test() {
  useEffect(() => {
    console.log('test page rendered');
  })
    return (
      <Map />
    );
  }