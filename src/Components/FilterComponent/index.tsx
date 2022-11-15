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
import { CurrencyFormat } from '../../services/currencyFormat';

export function FilterComponent() {
  return (
    <Grid item> 
      <Card elevation={5} sx={{ mt: 2, height: 240 }}>
        <CardContent>
          <FormControl fullWidth>
            <Typography>Tipo de transação</Typography>
            <Select
              name="transactionType"
              fullWidth
            >
              <MenuItem value="CashIn">Cash-in</MenuItem>
              <MenuItem value="CashOut">Cash-out</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <Typography>Data da transação</Typography>
            <Select
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