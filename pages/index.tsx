import nookies from 'nookies'
import { GetServerSidePropsContext } from "next"
import { Header } from '../src/Components/Header'
import { Box, Container, Grid, Typography, Card } from '@mui/material'
import { TotalBalance } from '../src/Components/TotalBalance'
import { TransferComponent } from '../src/Components/TransferComponent'
import { HistoryComponent } from '../src/Components/HistoryComponent'
import { FilterComponent } from '../src/Components/FilterComponent'
import { api } from '../src/services/axios'

export default function Home({ transactionsHistoryData, userBalance }: any) {

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
                <HistoryComponent transactionsHistoryData={transactionsHistoryData}  />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}> 
              <TotalBalance userBalance={userBalance} />

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

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = nookies.get(ctx)
  const token = cookies['auth.token']

  if(!token) {
    return {
      redirect: {
        destination: '/signin',
        permanent: false,
      }
    }
  }

  const userSession = await api.get('/users/getSession', {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
  })

  const { id } = userSession.data

  const getTransactions = await api.get(`/${id}/transactions`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
  })

  const getBalance = await api.get(`/${id}/accountBalance`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
  })

  return {
    props: {
      transactionsHistoryData: getTransactions.data,
      userBalance: getBalance.data
    }
  }
}
