import React from 'react';
import { NumberFormatBase } from 'react-number-format';
import { CurrencyFormat } from './currencyFormat';

export const NgCashAmountFormat = ((props: any) => {
  const format = (numStr: string) => {
    if ((typeof numStr !== 'string') || numStr === '00') {
      return ''
    }
    
    return CurrencyFormat(Math.abs(Number(numStr)))
  }

  return <NumberFormatBase {...props} format={format} />
})

