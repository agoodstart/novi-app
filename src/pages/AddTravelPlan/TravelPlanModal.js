import React from 'react';

import Modal from '../../components/Modal/Modal';
import Box from '../../components/Box/Box';
import Typography from '../../components/Typography/Typography';
import Button from '../../components/Button/Button';

import useTheme from '../../hooks/useTheme';

export default function TravelPlanModal({chosen, modalRef, saveDestination, handleCloseModal}) {
  const { colors } = useTheme();

  return (
    <Modal ref={modalRef} >
      <Box backgroundColor={colors.background.white} borderRadius={10} padding={50}>
        <Typography variant="h4" fontWeight="400" >Are you sure you want to save <strong>{chosen.formattedAddress}</strong> as your next destination?</Typography>
        
        <Box flexDirection="row" justifyContent="space-around">
          <Button
            onClick={saveDestination}
            color={colors.background.primary.main}
            size="medium"
            elevation={1}
          >
            Yes
          </Button>
          <Button
            onClick={handleCloseModal}
            color={colors.background.secondary.main}
            size="medium"
            elevation={1}
          >
            No
          </Button>
        </Box>
      </Box>
  </Modal>
  )
}