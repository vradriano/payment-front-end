import React, { useState, FormEvent } from "react"
import { GetServerSidePropsContext } from "next"
import { useRouter } from 'next/router'
import { ButtonComponent } from '../../src/components/ButtonComponent'
import { InputComponent } from "../../src/components/InputComponent"
import { api } from "../../src/services/axios"
import { Header } from "../../src/components/Header"
import { styles } from "./styles"
import nookies from 'nookies'
import validator from 'validator'
import {
  Container,
  Box,
  Paper,
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    
    const preventMultiplesUsersWithSameUsername = username.toLowerCase()

    await api.post('/users/create', {
      username: preventMultiplesUsersWithSameUsername,
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
            <InputComponent
              name="username"
              type="text"
              title="Username"
              value={username}
              onChange={(e) => handleChangeUsername(e.target.value)}
              hasError={
                hasError.error && hasError.type === 'username' ? hasError.message : null
              }
            />

            <InputComponent
              title="Senha"
              name="password"
              type="password"
              value={password}
              onChange={(e) => handleChangePassword(e.target.value)}
              hasError={
                hasError.error && hasError.type === 'weakPassword' ? hasError.message : null
              }
            />

            <ButtonComponent 
              isDisabled={isUserHasLessThan3Character || hasError.error || !password}
              text="Cadastrar"
            />
          </form>
        </Paper>
      </Container>
    </Box>
  )
}

export default SignUp


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