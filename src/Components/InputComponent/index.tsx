import React, { ChangeEvent } from 'react'
import { FormControl, FormHelperText, Input, InputLabel } from "@mui/material"
import { styles } from "./styles"

interface Props {
  title: string;
  name: string;
  type: string;
  value: string;
  hasError?: string | null;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function InputComponent ({ 
  title, 
  value,
  name, 
  type,
  hasError,
  onChange,
}: Props) {
  return (
    <FormControl fullWidth sx={{ mt: 4 }}>
      <InputLabel
        sx={styles.inputText}
      >
        {title}
      </InputLabel>
      <Input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        sx={styles.inputStyles}
      />
      <FormHelperText sx={styles.helperText}>
        {hasError}
      </FormHelperText>
    </FormControl>
  )
}