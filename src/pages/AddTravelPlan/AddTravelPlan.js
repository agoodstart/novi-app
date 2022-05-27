import React from 'react';
import { useOutletContext } from "react-router-dom";
import GoogleMapsMap from '../../components/GoogleMaps/GoogleMapsMap';

export default function AddTravelPlan() {
  const user = useOutletContext();

  return (
    <GoogleMapsMap />
  );
}