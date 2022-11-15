import { Button, Container, Box, Paper, FormControl, Input, InputLabel, Typography } from "@mui/material"
import { Header } from "../../src/Header"
import { theme } from "../../src/styles/theme"
import { styles } from "./styles"

const SignUp = () => {
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

          <FormControl fullWidth>
          <InputLabel
            sx={styles.inputText}
            >
              E-mail
            </InputLabel>
            <Input
              name="email"
              type="email"
              onChange={() => {}}
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
              onChange={() => {}}
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
        </Paper>
      </Container>
    </Box>
  )
}

export default SignUp