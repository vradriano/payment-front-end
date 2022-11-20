import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Container,
  Button
} from '@mui/material'
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { styles } from './styles'
import Link from 'next/link'
import { getUserName } from '../../services/user'

export function Header({ username }: any) {
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
                <Box sx={{ display: 'flex' }}>
                  <Link href="/signin" passHref>
                    <Typography sx={styles.firstLink}>Login</Typography>
                  </Link>
                  
                  <Link href="/signup" passHref>
                    <Typography sx={styles.redirectLink}>Signup</Typography>
                  </Link>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center' }} >
                  <Typography sx={styles.userTitle}>
                    Bem vindo, {getUserName(username)}
                  </Typography>
                  <Typography>
                    |
                  </Typography>
                  <Button sx={styles.redirectLink} onClick={signOut}>Log-out</Button>
                </Box>
              )
            }
            
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}