import { Stack, Typography } from '@mui/material';
import React from 'react'

const Welcome = ({firstName}) => {
   return (
      <Stack justifyContent="center" alignItems="center" flexGrow={1}>
         <Typography variant='h2'>Welcome{firstName}</Typography>
      </Stack>
   )
}

export default Welcome;