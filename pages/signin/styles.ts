import { theme } from "../../src/styles/theme";

export const styles = {
  containerStyles: { 
    justifyContent: 'center',
    margin: '0 auto', 
    display: 'flex', 
    alignItems: 'center', 
    height: 'calc(100vh - 70px)' 
  },
  paperWrapper: {
    padding: 5
  },
  title: { 
    fontWeight: 600, 
    justifyContent: 'center', 
    margin: '0 auto', 
    display: 'flex', 
    paddingTop: '-20px', 
    paddingBottom: 1 
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
  buttonStyles: { 
    mt: 3, 
    padding: 1,
    backgroundColor: theme.palette.primary.main,
    textTransform: 'none',
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.primary.main,
      opacity: '0.96'
    }
  }
}