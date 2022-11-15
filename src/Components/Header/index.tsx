import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button
} from '@mui/material'
import { styles } from './styles'
import Link from 'next/link'

export function Header() {
  const hasSession = false

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles.header}>
        <Container maxWidth="xl" >
          <Toolbar>
            <Typography variant="h6" component="div" sx={styles.logoTitle}>
              NG.CASH
            </Typography>

            {
              !hasSession ? (
                <>
                  <Link href="/signin">
                    <Button sx={styles.redirectLink}>Login</Button>
                  </Link>
                  
                  <Link href="/signup">
                    <Button sx={styles.redirectLink}>Cadastrar</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/">
                    <Button sx={styles.redirectLink}>Deslogar</Button>
                  </Link>
                </>
              )
            }
            
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}