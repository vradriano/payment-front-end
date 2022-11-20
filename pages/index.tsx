import React, { useState } from 'react'
import { GetServerSidePropsContext } from "next"
import { Header } from '../src/components/Header'
import { Box, Container, Grid, Typography } from '@mui/material'
import { TotalBalance } from '../src/components/TotalBalance'
import { TransferComponent } from '../src/components/TransferComponent'
import { HistoryComponent } from '../src/components/HistoryComponent'
import { FilterComponent } from '../src/components/FilterComponent'
import { apiSSR } from '../src/services/axiosSSR'
import { styles } from './styles'
import nookies from 'nookies'

interface TransactionsProps {
  id: number;
  value: number;
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
  username: string;
}

export default function Home({ 
  transactionsHistoryData, 
  userBalance, 
  username 
}: Props) {
  const [transactions, setTransactions] = useState(transactionsHistoryData)
  const [userAmount, setUserAmount] = useState(userBalance.balance)
  const [filterParams, setFilterParams] = useState({
    filterType: 'Default',
    filterDate: 'Default'
  })

  function handleAddTransactions(newTransaction: TransactionsProps) {
    setTransactions((prevProps: TransactionsProps[]) => [...prevProps, newTransaction])
  } 

  function handleSumTransactions(newBalance: number) {
    setUserAmount(newBalance)
  } 

  function handleFilterByCategories(filters: Filters) {
    setFilterParams({
      filterType: filters.filterType,
      filterDate: filters.filterDate
    })
  }

  const historiesFormatted = transactions.filter((transaction: TransactionsProps) => {
    return filterParams.filterType !== "Default" ? filterParams.filterType === transaction.type : transaction
  })

  const historiesFiltered = historiesFormatted.filter((history: any) => {
    return filterParams.filterDate !== "Default" 
    ? new Intl.DateTimeFormat('pt-BR').format(history.createdAt) === filterParams.filterDate
    : history
  })

  const getAllDates = historiesFiltered.map((transaction: TransactionsProps) => {
    return new Intl.DateTimeFormat('pt-BR').format(transaction.createdAt)
  })

  const removeDuplicatesDate = getAllDates.filter((equals: any, index: any) => getAllDates.indexOf(equals) === index)

  return (
    <Box>
      <Header username={username} />
      <Container maxWidth="lg" component="main">
        <Grid container spacing={3} sx={styles.grid}>
            <Grid item xs={12} md={9}>
              <Box  component="div">
                <Typography variant="h5" sx={styles.TransferTitle}>
                  Transferir valores
                </Typography>

                <TransferComponent
                  actualBalance={userAmount}
                  onHandleSumTransactions={handleSumTransactions}
                  onHandleAddTransactions={handleAddTransactions}
                />
              </Box>

              <Box component="div">
                <Typography variant="h5" sx={styles.transactionsTitle}>
                  Histórico de transações
                </Typography>

                <HistoryComponent
                  username={username}
                  transactionsHistoryData={historiesFiltered}  
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={3}> 
              <TotalBalance 
                userBalance={userAmount} 
              />

              <Box component="div">
                <Typography variant="h5" sx={styles.transactionsTitle}>
                  Filtros
                </Typography>

                <FilterComponent 
                  getAllHistoriesDate={removeDuplicatesDate}
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

  const userSession = await apiSSR.get('/users/getSession', {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
  })

  const { id, username } = userSession.data

  const getTransactions = await apiSSR.get(`/${id}/transactions`, {
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

  const getBalance = await apiSSR.get(`/${id}/accountBalance`, {
    headers: {
      Authorization: `Bearer ${token}`
    }, 
  })

  return {
    props: {
      username,
      transactionsHistoryData: transactionsFormatted,
      userBalance: getBalance.data,
    }
  }
}
