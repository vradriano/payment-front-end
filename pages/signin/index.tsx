import {
  Container,
  Box,
  Paper,
  Typography
} from "@mui/material"
import React, { useState, SyntheticEvent, useContext } from "react"
import useToasty from '../../src/contexts/Toasty'
import { GetServerSidePropsContext } from "next"
import { AuthContext } from '../../src/contexts/AuthContext'
import { Header } from "../../src/components/Header"
import { InputComponent } from "../../src/components/InputComponent"
import { ButtonComponent } from "../../src/components/ButtonComponent"
import { styles } from "./styles"
import nookies from 'nookies'

const SignIn = () => {
  const { signIn } = useContext(AuthContext)
  const { setToasty } = useToasty()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeUsername(username: string) {
    setUsername(username)
  }

  function handleChangePassword(password: string) {
    setPassword(password)
  }

  async function handleLogin(event: SyntheticEvent) {
    event.preventDefault()

    const usernameFormattedToLogin = username.toLowerCase()

    const data = {
      username: usernameFormattedToLogin,
      password
    }

    try {
      await signIn(data)
    } catch {
      setToasty({
        open: true,
        text: 'Usuário ou senha inválido!',
        severity: 'error'
      })
    }
  }

  return (
    <Box>
      <Header />

      <Container 
        maxWidth="lg" 
        sx={styles.containerStyles}
      >
        <Paper sx={styles.paperWrapper} elevation={2}>
          <Typography 
            variant="h5" 
            sx={styles.title}
          >
            Entre na sua conta
          </Typography>

          <form onSubmit={handleLogin}>
            <InputComponent
              name="username"
              type="text"
              title="Username"
              value={username}
              onChange={(e) => handleChangeUsername(e.target.value)}
            />

            <InputComponent
              name="password"
              type="password"
              title="Senha"
              value={password}
              onChange={(e) => handleChangePassword(e.target.value)} 
            />

            <ButtonComponent 
              isDisabled={!username}
              text="Entrar"
            />    
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default SignIn



export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = nookies.get(ctx)
  const token = cookies['auth.token']

  if(token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}