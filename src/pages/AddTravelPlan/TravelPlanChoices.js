import React from 'react';

import Box from '../../components/Box/Box';
import Typography from '../../components/Typography/Typography';

import useTheme from '../../hooks/useTheme';

export default function TravelPlanChoices(props) {
  const { colors } = useTheme();

  return (
    <Box flexDirection="row" justifyContent="space-between">
    <Box width={45} borderRadius={10} backgroundColor={colors.background.gray.alpha['30']} padding={10}>
      <Typography variant="h5">
        Your Choice:
      </Typography>
      <Typography variant="paragraph">
        {props.chosen?.formattedAddress}
      </Typography>
    </Box>

    <Box width={45} borderRadius={10} backgroundColor={colors.background.gray.alpha['50']} padding={10}>
      <Typography variant="h5">
        Our Choice:
      </Typography>
      <Typography variant="paragraph">
        {props.recommended?.formattedAddress}
      </Typography>
    </Box>
  </Box>
  )
}