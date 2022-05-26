import React from 'react';
import { useOutletContext } from "react-router-dom";

export default function Endpoints() {
  const user = useOutletContext();

  return (
    <React.Fragment>
      <h2>welcome {user}!</h2>
    </React.Fragment>
  );
}