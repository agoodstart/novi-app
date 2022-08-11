import React, { useEffect, useRef} from 'react';

import Box from '../Box/Box';
import Typography from '../Typography/Typography';

export default function Card({children, width, height, outlined, backgroundColor}) {
  
  return (
    <Box elevation={2} flexDirection={"column"} backgroundColor={backgroundColor} width={width} height={height} borderRadius={10} customStyles={{
      border: outlined ? '1px solid rgba(17, 21, 28, 0.2)' : 'none',
      margin: '20px'
    }}>
      {children}
    </Box>
  )

}

export function CardHeader({children}) {
  return (
    <Box width={100} flexDirection={"row"} alignItems={"center"} justifyContent={"center"} height={30} customStyles={{
      borderRadius: '10px 10px 0 0',
      borderBottom: '1px solid rgba(17, 21, 28, 0.2)',
      }}>
      {children}
    </Box>
  )
}

export function CardBody({children}) {
  return (
    <Box width={100} flexDirection={"column"} alignItems={"center"} justifyContent={"space-evenly"} height={70} customStyles={{border: '0 0 10px 10px'}}>
      {children}
    </Box>
  )
}