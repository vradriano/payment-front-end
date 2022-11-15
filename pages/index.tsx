import { Header } from '../src/Components/Header'
import { Box, Container, Grid, Typography, Card } from '@mui/material'
import { TotalBalance } from '../src/Components/TotalBalance'
import { TransferComponent } from '../src/Components/TransferComponent'
import { HistoryComponent } from '../src/Components/HistoryComponent'
import { FilterComponent } from '../src/Components/FilterComponent'

export default function Home() {
  return (
    <Box>
      <Header />

      <Container maxWidth="lg">
        <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={9}>
              <Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, fontFamily: 'Roboto'}}>
                  Transferir valores
                </Typography>
                <TransferComponent />
              </Box>

              <Box>
                <Typography variant="h5" sx={{ mt: 3, mb: -2, fontWeight: 600, fontFamily: 'Roboto'}}>
                  Histórico de transações
                </Typography>
                <HistoryComponent />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}> 
              <TotalBalance />

              <Box>
                <Typography variant="h5" sx={{ mt: 3, mb: -2, fontWeight: 600, fontFamily: 'Roboto'}}>
                  Filtros
                </Typography>

                <FilterComponent />
              </Box>
            </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
