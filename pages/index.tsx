import { Header } from '../src/Header'
import { Box, Container, Grid } from '@mui/material'
import { TotalBalance } from '../src/TotalBalance'
import { TransferComponent } from '../src/TransferComponent'

export default function Home() {
  return (
    <Box>
      <Header />

      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={9}>
              <TransferComponent />
            </Grid>

            <Grid item xs={12} md={3}> 
              <TotalBalance />
            </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
