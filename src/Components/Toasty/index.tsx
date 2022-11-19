import {
  Snackbar,
  Alert 
} from '@mui/material'
import { SyntheticEvent } from 'react';

type ToastyProps = {
  open: boolean;
  text: string;
  severity: "success" | "info" | "error";
}

interface Props {
  open: boolean;
  text: string;
  severity: "success" | "info" | "error";
  onClose?: ( toasty?: ToastyProps | null ) => void;
}

const Toasty = ({ open, text, severity, onClose = undefined}: Props) => {
  const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
    if(reason === 'clickaway'){
      return
    }

    if(onClose) onClose()
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert elevation={6} variant="filled" severity={severity}>
        {text}
      </Alert>
    </Snackbar>
  )
}

export default Toasty