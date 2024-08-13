import React from 'react'
import { Snackbar as MuiSnackbar , Alert } from '@mui/material'

const Snackbar = ({open , message , type , onClose}) => {
    return (
        <MuiSnackbar
        open={open}
        autoHideDuration={5000}
        onClose={onClose}
        anchorOrigin={{vertical: 'bottom' , horizontal:'center'}}
        >
            <Alert onClose={onClose} severity={type} sx={{width: '100%'}}>
                {message}
            </Alert>
        </MuiSnackbar>
      )
} 

export default Snackbar