import {useEffect} from 'react';
import GoogleMapsMap from '../../components/GoogleMaps/GoogleMapsMap';

export default function Test() {
  useEffect(() => {
    console.log('test page rendered');
  })
    return (
      <GoogleMapsMap />
    );
  }