import { theme } from "../../styles/theme";

export const styles = {
  buttonStyles: { 
    mt: 3, 
    padding: 1,
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    textTransform: 'none',
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.primary.main,
      opacity: '0.96'
    },
    "&.MuiButton-root.Mui-disabled": {
      color: theme.palette.primary.light,
      opacity: '0.75',
      cursor: 'not-allowed'
    }
  }
}