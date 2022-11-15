import {
  Typography,
  Grid,
  CardContent,
  Card
} from '@mui/material'
import { styles } from './styles'

export function TotalBalance() {
  return (
    <Grid item xs={4}> 
      <Card sx={styles.cardContainer} elevation={5}>
        <CardContent sx={styles.cardWrapper}>
          <Typography sx={styles.balanceTitle} color="text.secondary" gutterBottom>
            Balanço
          </Typography>
          <Typography variant="h5" component="div" sx={styles.sumValue} >
            R$: 1500
          </Typography>
          <Typography variant="caption" color="text.secondary">
            *Saldo atual
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}