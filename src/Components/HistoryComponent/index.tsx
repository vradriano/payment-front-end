import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled
} from '@mui/material'

import { CurrencyFormat } from '../../services/currencyFormat';
import { DateFormat } from '../../services/dateFormat';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface TransactionsProps {
  id: number;
  value: number;
  debitedAccountId: number;
  creditedAccountId: number;
  createdAt: number;
  type: 'Cash-In' | 'Cash-Out';
}

interface Props {
  username: string;
  transactionsHistoryData: TransactionsProps[]
}

export function HistoryComponent({ transactionsHistoryData, username }: Props) {


  return (
    <TableContainer sx={{ mt: 3}} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Usuário</StyledTableCell>
            <StyledTableCell align="right">Conta débitada</StyledTableCell>
            <StyledTableCell align="right">Conta creditada</StyledTableCell>
            <StyledTableCell align="right">Valor da transferência</StyledTableCell>
            <StyledTableCell align="right">Tipo da transferência</StyledTableCell>
            <StyledTableCell align="right">Data da transferência</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            transactionsHistoryData.length && transactionsHistoryData.map((transaction: TransactionsProps) => {

              return (
                <StyledTableRow key={transaction.id}>
                  <StyledTableCell component="th" scope="row">
                    {username}
                  </StyledTableCell>
                  <StyledTableCell align="right">{transaction.debitedAccountId}</StyledTableCell>
                  <StyledTableCell align="right">{transaction.creditedAccountId}</StyledTableCell>
                  <StyledTableCell align="right">{CurrencyFormat(transaction.value)}</StyledTableCell>
                  <StyledTableCell align="right">{transaction.type}</StyledTableCell>
                  <StyledTableCell align="right">{DateFormat(transaction.createdAt)}</StyledTableCell>
                </StyledTableRow>
              )
            })
          }
        
        </TableBody>
      </Table>
    </TableContainer>
  );
}