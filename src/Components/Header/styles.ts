import { theme } from "../../styles/theme";

export const styles = {
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light
  },
  logoTitle: {
    flexGrow: 1,
    fontWeight: 600,
    fontSize: 28,
    fontFamily: 'Roboto'
  },
  userTitle: { 
    textTransform: 'none',
    mr: 1.5, 
    fontWeight: 600, 
    fontSize: 16, 
    color: theme.palette.primary.light 
  },
  firstLink: {
    textTransform: 'none',
    mr: 2,
    fontWeight: 600, 
    fontSize: 16, 
    color: theme.palette.primary.light 
  },
  redirectLink: { 
    textTransform: 'none',
    ml: 1, 
    fontWeight: 600, 
    fontSize: 16, 
    color: theme.palette.primary.light 
  }
}