import { Button, Container, Box, Paper, FormControl, Input, InputLabel, Typography } from "@mui/material"
import { Header } from "../../src/Components/Header"
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
              Username
            </InputLabel>
            <Input
              name="username"
              type="text"
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