import React from 'react';

export default function DashboardWeather(props) {

  const weather = props.weather.read();
  console.log(weather.current);

  return (
    <>
    </>
  )
}