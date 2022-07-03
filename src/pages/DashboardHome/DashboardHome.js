import React from 'react';
import { useOutletContext } from "react-router-dom";
import Container from '../../components/Container/Container';
import Typography from '../../components/Typography/Typography';

export default function DashboardHome() {
  const user = useOutletContext();

  return (
    <Container element="section">
      <Typography variant="h1">
        <strong>Welcome,</strong> {user}
      </Typography>
    </Container>
  );
}