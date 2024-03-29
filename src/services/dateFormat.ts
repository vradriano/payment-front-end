export const DateFormat = (num: number) => {

  return (
    new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit', 
      }
    ).format(num)
  )
}
