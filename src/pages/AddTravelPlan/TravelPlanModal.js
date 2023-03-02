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
      <Box backgroundColor={colors.background.white.main} borderRadius={10} padding={50}>
        <Typography variant="h4" fontWeight="400" >Are you sure you want to save <strong>{chosen.formattedAddress}</strong> as your next destination?</Typography>
        
        <Box flexDirection="row" justifyContent="space-around" height={75} padding={20}>
          <Button
            type="button"
            onClick={handleCloseModal}
            color={colors.background.secondary.main}
            size="medium"
            elevation={1}
            customStyles={{
              width: '40%'
            }}
          >
            No
          </Button>
          <Button
            type="button"
            onClick={saveDestination}
            color={colors.background.primary.main}
            size="medium"
            elevation={1}
            customStyles={{
              width: '40%'
            }}
          >
            Yes
          </Button>
        </Box>
      </Box>
  </Modal>
  )
}