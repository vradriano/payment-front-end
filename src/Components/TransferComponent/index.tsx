import {
  Typography,
  Grid,
  Card,
  FormControl,
  Input,
  InputLabel,
  Button
} from '@mui/material'
import { styles } from './styles'

export function TransferComponent() {
  return (
    <Grid item> 
      <Card elevation={5} sx={styles.cardWrapper}>
        <FormControl fullWidth sx={styles.formControlWrapper}>
          <Typography
          >
            Username:
          </Typography>
          <Input
            name="username"
            type="text"
            sx={styles.inputStyles}
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
            sx={styles.inputStyles}
            onChange={() => {}}
          />
        </FormControl>

        <Button variant="contained" sx={styles.sendTransferButton}>Enviar</Button>
      </Card>
    </Grid>
  );
}