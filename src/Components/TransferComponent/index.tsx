import {
  Typography,
  Grid,
  Card,
  FormControl,
  FormHelperText,
  Input,
  Button,
  InputAdornment
} from '@mui/material'
import useToasty from "../../contexts/Toasty"
import { api } from '../../services/axios'
import { AuthContext } from "../../contexts/AuthContext"
import { SyntheticEvent, useState, useContext } from 'react'
import { parseCookies } from 'nookies'
import { styles } from './styles'

interface ErrorProps {
  type: string;
  error: boolean;
  message: string;
}

interface TransactionsProps {
  id: number;
  value: number;
  debitedAccountId: number;
  creditedAccountId: number;
  createdAt: number;
  type: 'Cash-In' | 'Cash-Out'
}

interface Props {
  actualBalance: number;
  onHandleSumTransactions: (actualSum: number) => void;
  onHandleAddTransactions: (transactions: TransactionsProps) => void;
}

export function TransferComponent({
  actualBalance,
  onHandleSumTransactions,
  onHandleAddTransactions
}: Props) {
  const { setToasty } = useToasty()
  const [username, setUsername] = useState('')
  const [amount, setAmount] = useState(0)
  const [hasAmountError, setHasAmountError] = useState<ErrorProps>({
    type: '',
    error: false,
    message: ''
  })
  const { user } = useContext(AuthContext)
  const { 'auth.token': token } = parseCookies()

  function handleChangeUsername(username: string) {

    setUsername(username)
  }

  function handleChangeAmount(amount: number) {
    if(hasAmountError.type === 'insufficientFundsToTransfer') {
      setHasAmountError({
        type: '',
        error: false,
        message: ''
      })
    }

    setAmount(amount)
  }

  function handleResponseError(errorStatus: number) {
    switch(errorStatus) {
      case 400: 
        setHasAmountError({
          type: 'insufficientFundsToTransfer',
          error: true,
          message: 'O valor a ser transferido é maior que o saldo bancário!'
        })
      break;
      case 401: 
        setHasAmountError({
          type: 'InvalidUser',
          error: true,
          message: 'O usuário de destino não existe. Por favor, informe um usuário válido!'
        })
      break;
      default:
        break;
    }
  }
  
  async function handleTransferAmount(event: SyntheticEvent) {
    const usernameFormattedToTransfer = username.toLowerCase()

    if(username === user?.username) {
      setHasAmountError({
        type: 'sameAccount',
        error: true,
        message: 'Você não pode transferir para si mesmo.'
      })

      return
    }

    if(amount === 0) {
      setHasAmountError({
        type: 'insufficientFundsToTransfer',
        error: true,
        message: 'Não há o que transferir!'
      })

      return
    }

    await api.post('/transactions/create', {
      userDebited: user!.username,
      userCredited: usernameFormattedToTransfer,
      value: amount
    }, {
    headers: {
      Authorization: `Bearer ${token}`
    }}).then(res => {
      const actualSum = actualBalance! - amount
      onHandleSumTransactions(actualSum)
      setUsername('')
      setAmount(0)

      const { id, debitedAccountId, creditedAccountId, value, createdAt } = res.data 

      onHandleAddTransactions({
        id,
        debitedAccountId,
        creditedAccountId,
        value,
        createdAt,
        type: 'Cash-Out'
      })

      setToasty({
        open: true,
        text: "Transação efetuada com sucesso!",
        severity: "success"
      })

      if(hasAmountError) {
        setHasAmountError({
          type: '',
          error: false,
          message: ''
        })
      }
    }).catch(err => {
      handleResponseError(err.request.status)
    })
  }

  return (
    <Grid item> 
      <Card elevation={5} sx={styles.cardWrapper}>

        <form>
        <FormControl fullWidth sx={styles.formControlWrapper}>
          <Typography
          >
            Username:
          </Typography>
          <Input
            name="username"
            type="text"
            value={username}
            sx={styles.inputStyles}
            onChange={e => handleChangeUsername(e.target.value)}
          />
          <FormHelperText sx={styles.helperText}>
            {hasAmountError.error && hasAmountError.type === 'InvalidUser' || hasAmountError.type === "sameAccount" ? hasAmountError.message : null}
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth sx={styles.formControlWrapper}>
          <Typography
          >
            Valor a ser transferido:
          </Typography>
          <Input
            name="amount"
            type="number"
            value={amount}
            sx={styles.inputStyles}
            onChange={e => handleChangeAmount(parseInt(e.target.value))}
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
          />
          <FormHelperText sx={styles.helperText}>
            {hasAmountError.error && hasAmountError.type === 'insufficientFundsToTransfer' ? hasAmountError.message : null}
          </FormHelperText>
        </FormControl>

        <Button 
          variant="contained" 
          disabled={!username}
          sx={styles.sendTransferButton} 
          onClick={handleTransferAmount}
        >
          Enviar
        </Button>
        </form>
      </Card>
    </Grid>
  );
}