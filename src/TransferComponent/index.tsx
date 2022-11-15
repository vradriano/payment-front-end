import {
  Typography,
  Grid,
  Card,
  FormControl,
  Input,
  InputLabel
} from '@mui/material'
import { styles } from './styles'

export function TransferComponent() {
  return (
    <Grid item> 
      <Card elevation={5} sx={styles.cardWrapper}>
        <Typography variant="h5">Transferir valores</Typography>
        
        <FormControl fullWidth sx={styles.formControlWrapper}>
          <Typography
          >
            Username:
          </Typography>
          <Input
            name="username"
            type="text"
            onChange={() => {}}
          />
        </FormControl>

        <FormControl fullWidth sx={styles.formControlWrapper}>
          <Typography
          >
            Valor a ser transferido:
          </Typography>
          <Input
            name="password"
            type="number"
            onChange={() => {}}
          />
        </FormControl>
      </Card>
    </Grid>
  );
}