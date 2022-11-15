import { Header } from '../src/Header'
import { Box, Container, Grid, Paper, Typography } from '@mui/material'
import { TotalBalance } from '../src/TotalBalance'

export default function Home() {
  return (
    <Box>
      <Header />

      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={8}>
              <Paper>
                <Typography>NG.CASH</Typography>
              </Paper>
            </Grid>

            <Grid item xs={4}> 
              <TotalBalance />
            </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
