import nookies from 'nookies'
import { GetServerSidePropsContext } from "next"
import { Header } from '../src/Components/Header'
import { Box, Container, Grid, Typography } from '@mui/material'
import { TotalBalance } from '../src/Components/TotalBalance'
import { TransferComponent } from '../src/Components/TransferComponent'
import { HistoryComponent } from '../src/Components/HistoryComponent'
import { FilterComponent } from '../src/Components/FilterComponent'
import { api } from '../src/services/axios'
import { useState } from 'react'

interface TransactionsProps {
  id: number;
  value: string;
  debitedAccountId: number;
  creditedAccountId: number;
  createdAt: string;
  type: 'Cash-In' | 'Cash-Out';
}

interface BalanceProps {
  id: number;
  balance: number;
}

interface Props {
  transactionsHistoryData: TransactionsProps;
  userBalance: BalanceProps;
  isUser: number;
}

export default function Home({ transactionsHistoryData, userBalance, isUser }: Props) {
  const [transactions, setTransactions] = useState<any | null>(transactionsHistoryData)
  const [userAmount, setUserAmount] = useState(userBalance.balance)

  function handleAddTransactions(newTransaction: TransactionsProps) {
    setTransactions((prevProps: TransactionsProps[]) => [...prevProps, newTransaction])
  } 

  function handleSumTransactions(newBalance: number) {
    setUserAmount(newBalance)
  } 

  function handleFilterByCategories(filterType: string) {
    const historyFormatted = transactionsHistoryData.filter((transaction: TransactionsProps) => {
      return filterType === transaction.type
    })
    
    setTransactions(historyFormatted)
  }

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

                <TransferComponent
                  actualBalance={userAmount}
                  onHandleSumTransactions={handleSumTransactions}
                  onHandleAddTransactions={handleAddTransactions}
                />
              </Box>

              <Box>
                <Typography variant="h5" sx={{ mt: 3, mb: -2, fontWeight: 600, fontFamily: 'Roboto'}}>
                  Histórico de transações
                </Typography>

                <HistoryComponent
                  isUser={isUser}
                  transactionsHistoryData={transactions}  
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}> 
              <TotalBalance 
                onHandleSumTransactions={handleSumTransactions}
                userBalance={userAmount} 
              />

              <Box>
                <Typography variant="h5" sx={{ mt: 3, mb: -2, fontWeight: 600, fontFamily: 'Roboto'}}>
                  Filtros
                </Typography>

                <FilterComponent 
                  onHandleFilterByCategories={handleFilterByCategories}
                />
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

  const transactionsFormatted = getTransactions.data.map((transaction: TransactionsProps) => {
    return {
      ...transaction,
      type: transaction.debitedAccountId === id ? 'Cash-Out' : 'Cash-In'
    }
  })


  const getBalance = await api.get(`/${id}/accountBalance`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
  })

  return {
    props: {
      isUser: id,
      transactionsHistoryData: transactionsFormatted,
      userBalance: getBalance.data
    }
  }
}
