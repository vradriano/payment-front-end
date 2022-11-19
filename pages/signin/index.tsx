import {
  Button,
  Container,
  Box,
  Paper,
  FormControl,
  Input,
  InputLabel,
  Typography
} from "@mui/material"
import { useState, SyntheticEvent, useContext } from "react"
import { AuthContext } from '../../src/contexts/AuthContext'
import { Header } from "../../src/components/Header"
import { styles } from "./styles"

const SignIn = () => {
  const { signIn } = useContext(AuthContext)
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

    signIn(data)
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
            <FormControl fullWidth>
              <InputLabel
                sx={styles.inputText}
              >
                Username
              </InputLabel>
              <Input
                name="username"
                type="text"
                onChange={(e) => handleChangeUsername(e.target.value)}
                sx={styles.inputStyles}
              />
            </FormControl>

            <FormControl fullWidth sx={{ mt: 4 }}>
              <InputLabel
                sx={styles.inputText}
              >
                Senha
              </InputLabel>
              <Input
                name="password"
                type="password"
                onChange={(e) => handleChangePassword(e.target.value)}
                sx={styles.inputStyles}
              />
            </FormControl>

            <Button
              fullWidth
              disabled={!username}
              type="submit"
              variant="contained"
              color="primary"
              sx={styles.buttonStyles}
            >
              Entrar
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default SignIn