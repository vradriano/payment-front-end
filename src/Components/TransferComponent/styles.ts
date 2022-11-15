import { theme } from "../../styles/theme";

export const styles = {
  cardWrapper: { 
    padding: 2 
  },
  formControlWrapper: {
    marginTop: 1
  },
  inputText: {
    "&.MuiInputLabel-root.Mui-focused": {
      color: theme.palette.primary.main
    }
  },
  inputStyles: {
    "&.MuiInput-root:after": {
      borderBottom: theme.palette.primary.main
    }
  },
  sendTransferButton: {
    marginTop: 2,
    backgroundColor: theme.palette.primary.main,
    textTransform: 'none',
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.primary.main,
      opacity: '0.95'
    }
  }
}