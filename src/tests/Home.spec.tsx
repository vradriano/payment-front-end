import React from "react"
import { render, screen } from "@testing-library/react"
import Home from "../../pages"

describe('Home page', () => {
  it('renders correctly', () => {
    render(<Home transactionsHistoryData={[]} userBalance={{id: 0, balance: 0}} formattedDates={[]} username={""} />)

    expect(screen.getByText('Transferir valores')).toBeInTheDocument()
    expect(screen.getByText('Histórico de transações')).toBeInTheDocument()
    expect(screen.getByText('Filtros'))
  })
})
