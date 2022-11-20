import { theme } from "../../styles/theme";

export const styles = {
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
  helperText: {
    maxWidth: '470px',
    color: 'red'
  }
}