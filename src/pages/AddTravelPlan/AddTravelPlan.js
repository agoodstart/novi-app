import React, { Suspense } from 'react';
import { useOutletContext } from "react-router-dom";
import GoogleMaps from '../../components/GoogleMaps/GoogleMaps';

export default function AddTravelPlan() {
  const user = useOutletContext();

  return (
    <Suspense fallback={<p>Loading Google Maps....</p>}>
      <GoogleMaps />
    </Suspense>
  );
}