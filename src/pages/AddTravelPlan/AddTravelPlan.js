import React from 'react';
import { useOutletContext } from "react-router-dom";
import GMWrapper from '../../components/GoogleMaps/GMWrapper';

export default function AddTravelPlan() {
  const user = useOutletContext();

  return (
    <GMWrapper />
  );
}