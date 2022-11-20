import React from "react"
import { HistoryComponent } from "."
import { render, screen } from "@testing-library/react"

describe("HistoryComponent component", () => {
  it("HistoryComponent is rendering correctly", () => {
    render(
      <HistoryComponent username="" transactionsHistoryData={[]} key="" />
    );

    expect(screen.getByText("Usuário")).toBeInTheDocument()
    expect(screen.getByText("Conta débitada")).toBeInTheDocument()
    expect(screen.getByText("Conta creditada")).toBeInTheDocument()
    expect(screen.getByText("Valor da transferência")).toBeInTheDocument()
    expect(screen.getByText("Tipo da transferência")).toBeInTheDocument()
  })

  it("HistoryComponent is rendering and receiving props correctly", () => {
    render(
      <HistoryComponent 
        username="Ngcash" 
        transactionsHistoryData={[{ 
          id: 1,
          value: 20,
          debitedAccountId: 1,
          creditedAccountId: 2,
          createdAt: 1668787878,
          type: "Cash-Out"
        }]} 
      />
    );

    expect(screen.getByText("Ngcash")).toBeInTheDocument()
    expect(screen.getByText("1")).toBeInTheDocument()
    expect(screen.getByText("2")).toBeInTheDocument()
    expect(screen.getByText("R$ 20,00")).toBeInTheDocument()
    expect(screen.getByText("Cash-Out")).toBeInTheDocument()
    expect(screen.getByText("20/01/1970 04:33:07")).toBeInTheDocument()
  })
});