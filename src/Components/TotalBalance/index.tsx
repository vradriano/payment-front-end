import {
  Typography,
  Grid,
  CardContent,
  Card
} from '@mui/material'
import { CurrencyFormat } from '../../services/currencyFormat';
import { styles } from './styles'

export function TotalBalance({userBalance}: any) {

  console.log(userBalance, 'user')
  return (
    <Grid item> 
      <Card sx={styles.cardContainer} elevation={5}>
        <CardContent sx={styles.cardWrapper}>
          <Typography sx={styles.balanceTitle} color="text.secondary" gutterBottom>
            Balanço
          </Typography>
          <Typography variant="h5" component="div" sx={styles.sumValue} >
            {CurrencyFormat(userBalance.balance)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            *Saldo atual
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}