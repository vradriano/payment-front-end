import nookies from 'nookies'
import { GetServerSidePropsContext } from "next"
import { Header } from '../src/components/Header'
import { Box, Container, Grid, Typography } from '@mui/material'
import { TotalBalance } from '../src/components/TotalBalance'
import { TransferComponent } from '../src/components/TransferComponent'
import { HistoryComponent } from '../src/components/HistoryComponent'
import { FilterComponent } from '../src/components/FilterComponent'
import { api } from '../src/services/axios'
import { useState } from 'react'

interface TransactionsProps {
  id: number;
  value: string;
  debitedAccountId: number;
  creditedAccountId: number;
  createdAt: number;
  type: 'Cash-In' | 'Cash-Out';
}

interface BalanceProps {
  id: number;
  balance: number;
}

interface Filters {
  filterType: string;
  filterDate: string;
}

interface Props {
  transactionsHistoryData: TransactionsProps[];
  userBalance: BalanceProps;
  formattedDates: string[];
}

export default function Home({ transactionsHistoryData, userBalance, formattedDates }: Props) {
  const [transactions, setTransactions] = useState<any | null>(transactionsHistoryData)
  const [userAmount, setUserAmount] = useState(userBalance.balance)

  function handleAddTransactions(newTransaction: TransactionsProps) {
    setTransactions((prevProps: TransactionsProps[]) => [...prevProps, newTransaction])
  } 

  function handleSumTransactions(newBalance: number) {
    setUserAmount(newBalance)
  } 

  function handleFilterByCategories(filtersParams: Filters) {

    const historiesFormatted = transactionsHistoryData!.filter((transaction: TransactionsProps) => {
      return filtersParams.filterType !== "Default" ? filtersParams.filterType === transaction.type : transaction
    })

    console.log(historiesFormatted, typeof historiesFormatted)

    const dateFormatted = historiesFormatted!.filter((history: any) => {
      return filtersParams.filterDate !== "Default" 
      ? new Intl.DateTimeFormat('pt-BR').format(history.createdAt) === filtersParams.filterDate
      : history
    })
    
    setTransactions(dateFormatted)
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
                  getAllHistoriesDate={formattedDates}
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

  const getAllDates = getTransactions.data.map((transaction: TransactionsProps) => {
    return new Intl.DateTimeFormat('pt-BR').format(transaction.createdAt)
  })

  const removeDuplicatesDate = getAllDates.filter((equals: any, index: any) => getAllDates.indexOf(equals) === index)


  return {
    props: {
      transactionsHistoryData: transactionsFormatted,
      userBalance: getBalance.data,
      formattedDates: removeDuplicatesDate
    }
  }
}
