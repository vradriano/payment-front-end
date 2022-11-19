import { theme } from "../../styles/theme";

export const styles = {
  cardWrapper: {
    mt: 2, 
  },
  buttonStyles: { 
    mt: 3, 
    padding: 1,
    width: '100%',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    textTransform: 'none',
    '&.MuiButton-root:hover': {
      backgroundColor: theme.palette.primary.main,
      opacity: '0.96'
    }
  },
}