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
import { api } from "../../src/services/axios"
import { Header } from "../../src/Components/Header"
import { styles } from "./styles"
import { SyntheticEvent, useState } from "react"

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleChangeUsername(username: string) {
    setUsername(username)
  }

  function handleChangePassword(password: string) {
    setPassword(password)
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    await api.post('/users/create', {
      username,
      password
    })

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
            Cadastre-se
          </Typography>
          
          <form onSubmit={handleSubmit}>          
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
              type="submit"
              variant="contained"
              color="primary"
              sx={styles.buttonStyles}
            >
              Cadastrar
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default SignUp