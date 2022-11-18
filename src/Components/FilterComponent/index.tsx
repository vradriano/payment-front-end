import {
  Typography,
  Select,
  MenuItem,
  Grid,
  CardContent,
  FormControl,
  InputLabel,
  Input,
  Card
} from '@mui/material'
import { useState } from 'react'
import { CurrencyFormat } from '../../services/currencyFormat';

export function FilterComponent({ onHandleFilterByCategories }: any) {
  const [transactionsFilter, setTransactionsFilter] = useState('')


  function onHandleFilterTransactions(value: string) {
    setTransactionsFilter(value)
    onHandleFilterByCategories(value)
  }

  return (
    <Grid item> 
      <Card elevation={5} sx={{ mt: 2, height: 240 }}>
        <CardContent>
          <FormControl fullWidth>
            <Typography>Tipo de transação</Typography>
            <Select
              value={transactionsFilter}
              onChange={(e) => onHandleFilterTransactions(e.target.value)}
              name="transactionType"
              fullWidth
            >
              <MenuItem value="Cash-In">Cash-in</MenuItem>
              <MenuItem value="Cash-Out">Cash-out</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <Typography>Data da transação</Typography>
            <Select
              value={transactionsFilter}
              name="transactionType"
              fullWidth
            >
              <MenuItem value="15/11/2022">15/11/2022</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </Grid>
  );
}