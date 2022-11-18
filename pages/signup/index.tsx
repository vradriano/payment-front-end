import { SyntheticEvent, useState } from "react"
import { useRouter } from 'next/router'
import { api } from "../../src/services/axios"
import { Header } from "../../src/Components/Header"
import { styles } from "./styles"
import validator from 'validator'
import {
  Button,
  Container,
  Box,
  Paper,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Typography
} from "@mui/material"

interface ErrorProps {
  type: 'weakPassword' | 'username' | '',
  error: boolean;
  message: string;
}

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [hasError, setHasError] = useState<ErrorProps>({
    type: '',
    error: false,
    message: ''
  })

  const router = useRouter()

  function handleChangeUsername(username: string) {
    if(hasError.type === 'username') {
      setHasError({
        type: '',
        error: false,
        message: ''
      })
    }
    setUsername(username)
  }

  function handleChangePassword(password: string) {
    if (validator.isStrongPassword(password, {
      minLength: 8, minLowercase: 1,
      minNumbers: 1, minUppercase: 1,
      minSymbols: 0
    })) {
      setHasError({
        type: '',
        error: false,
        message: ''
      })
    } else {
      setHasError({
        type: 'weakPassword',
        error: true,
        message: 'É obrigatório uma letra maiúscula, uma minúscula, um número e pelo menos 8 caracteres.'
      })
    }

    setPassword(password)
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault()

    await api.post('/users/create', {
      username,
      password
    }).then(res => {
      router.push('/signin')
    }).catch(err => {
      if(err.request.status === 404){
        setHasError({
          type: 'username',
          error: true,
          message: 'O username já está cadastrado!'
        })
      }
    })

  }

  let isUserHasLessThan3Character = username.length < 3

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
                value={username}
                onChange={(e) => handleChangeUsername(e.target.value)}
                sx={styles.inputStyles}
              />
              <FormHelperText sx={styles.helperText}>
                {hasError.error && hasError.type === 'username' ? hasError.message : null}
              </FormHelperText>
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
                value={password}
                onChange={(e) => handleChangePassword(e.target.value)}
                sx={styles.inputStyles}
              />
              <FormHelperText sx={styles.helperText}>
                {hasError.error && hasError.type === 'weakPassword' ? hasError.message : null}
              </FormHelperText>
            </FormControl>

            <Button
              fullWidth
              disabled={isUserHasLessThan3Character || hasError.error || !password}
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