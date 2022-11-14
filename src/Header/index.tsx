import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button
} from '@mui/material'
import { styles } from './styles'

export function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles.header}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ng.cash
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}