import React from 'react';
import { useOutletContext } from "react-router-dom";
import EmbeddedMap from "../../components/EmbeddedMap/EmbeddedMap";

export default function Profile() {
  const user = useOutletContext();

  console.log('Profile page rendered');
    return (
      <React.Fragment>
        <h2>welcome {user}!</h2>
        <EmbeddedMap />
      </React.Fragment>
    );
  }