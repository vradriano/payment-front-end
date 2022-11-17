import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button
} from '@mui/material'
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { styles } from './styles'
import Link from 'next/link'

export function Header() {
  const { user, signOut } = useContext(AuthContext)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={styles.header}>
        <Container maxWidth="xl" >
          <Toolbar>
            <Typography variant="h6" component="div" sx={styles.logoTitle}>
              NG.CASH
            </Typography>

            {
              !user ? (
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
                  <Typography sx={styles.userTitle}>
                    Bem vindo, {user.username}
                  </Typography>
                    <p>
                    |
                    </p>
                  
                  <Button sx={styles.redirectLink} onClick={signOut}>SignOut</Button>
                </>
              )
            }
            
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}