import React from 'react'
import { Button } from "@mui/material";
import { styles } from './styles'

interface Props {
  isDisabled: boolean | undefined;
  text: string;
}

export function ButtonComponent({
  isDisabled,
  text
}: Props) {

  return (
    <Button
      fullWidth
      disabled={isDisabled}
      type="submit"
      variant="text"
      sx={styles.buttonStyles}
    >
      {text}
    </Button>
  )
}