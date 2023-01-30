import React from 'react';

import Box from '../../components/Box/Box';
import Typography from '../../components/Typography/Typography';
import { Image } from '../../components/Media/Media';

import useTheme from '../../hooks/useTheme';

export function Recommended({recommended}) {
  console.log(recommended);
  const { colors } = useTheme();

  return (
    <Box flexDirection="column" justifyContent="center" alignItems="center" borderRadius={5} backgroundColor={colors.background.gray.alpha['30']} customStyles={{
      position: 'relative',
      border: '1px solid rgba(0, 0, 0, .25)'
    }}>
      <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h1">
        {recommended?.formattedAddress}
      </Typography>
      {/* <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h2">
          Distance: {chosen?.distance} km
        </Typography>

        <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h2">
          Temperature: {chosen?.temperature} &#8451;
        </Typography> */}
    <Image source={recommended.image} customStyles={{
      position: 'absolute',
      borderRadius: '5px',
      opacity: '0.80',
      zIndex: "-100"
    }} />
  </Box>
  )
}

export function Chosen({chosen}) {
  const { colors } = useTheme();

  return (
    <Box flexDirection="column" justifyContent="center" alignItems="center" borderRadius={5} backgroundColor={colors.background.gray.alpha['30']} customStyles={{
      position: 'relative',
      border: '1px solid rgba(0, 0, 0, .25)'
    }}>
      <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h1">
        {chosen?.formattedAddress}
      </Typography>
      {/* <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h2">
          Distance: {chosen?.distance} km
        </Typography>

        <Typography textColor={colors.text.white.main} fontWeight="500" elevation={2} variant="h2">
          Temperature: {chosen?.temperature} &#8451;
        </Typography> */}
    <Image source={chosen.image} customStyles={{
      position: 'absolute',
      borderRadius: '5px',
      opacity: '0.80',
      zIndex: "-100"
    }} />
  </Box>
  )

}