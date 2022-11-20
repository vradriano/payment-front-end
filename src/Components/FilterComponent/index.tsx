import {
  Typography,
  Select,
  MenuItem,
  Grid,
  CardContent,
  FormControl,
  Button,
  Card
} from '@mui/material'
import React, { useState } from 'react'
import { styles } from './styles' 

interface FilterProps {
  filterType: string;
  filterDate: string;
}

interface Props {
  onHandleFilterByCategories: (data: FilterProps) => void;
  getAllHistoriesDate: string[];
}

export function FilterComponent({ onHandleFilterByCategories, getAllHistoriesDate }: Props) {
  const [typeFilter, setTypeFilter] = useState('Default')
  const [dateFilter, setDateFilter] = useState('Default')

  function handleAddTypeFilter(type: string) {
    setTypeFilter(type)
  }

  function handleAddDateFilter(date: string) {
    setDateFilter(date)
  }

  function onHandleFilterTransactions() {
    const data ={
      filterType: typeFilter,
      filterDate: dateFilter
    }

    onHandleFilterByCategories(data)
  }

  return (
    <Grid item> 
      <Card elevation={5} sx={styles.cardWrapper}>
        <CardContent>
          <FormControl fullWidth>
            <Typography>Tipo de transação</Typography>
            <Select
              value={typeFilter}
              onChange={(e) => handleAddTypeFilter(e.target.value)}
              name="transactionType"
              fullWidth
            >
              <MenuItem value="Default">Mostrar todos</MenuItem>
              <MenuItem value="Cash-In">Cash-in</MenuItem>
              <MenuItem value="Cash-Out">Cash-out</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mt: 3 }}>
            <Typography>Data da transação</Typography>
            {
              getAllHistoriesDate[0] && (  
                <Select
                  value={dateFilter}
                  onChange={(e) => handleAddDateFilter(e.target.value)}
                  name="transactionType"
                  fullWidth
                >                             
                  <MenuItem id='dateButton' value="Default">Mostrar todos</MenuItem> 
                  {
                    getAllHistoriesDate.map((date: string ) => {

                      return (
                        <MenuItem key={date} value={date}>{date}</MenuItem>
                      )
                    })
                  }
                </Select>
              )
            }
          </FormControl>

          <Button 
            sx={styles.buttonStyles}
            onClick={onHandleFilterTransactions}
          >
            Filtrar
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}