import { theme } from "../styles/theme";

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
  redirectLink: { 
    textTransform: 'none', 
    fontWeight: 600, 
    fontSize: 16, 
    color: theme.palette.primary.light 
  }
}