import React from "react"
import { TransferComponent } from "."
import { render, screen } from "@testing-library/react"

describe("TransferComponent component", () => {
  it("TransferComponent is rendering correctly", () => {
    const mockFn = jest.fn()

    render(
      <TransferComponent actualBalance={0} onHandleAddTransactions={mockFn} onHandleSumTransactions={mockFn} />
    );

    expect(screen.getByText("Username:")).toBeInTheDocument();
    expect(screen.getByText("Valor a ser transferido:")).toBeInTheDocument();
  })

  it("Button to do transfer is disabled by default value", () => {
    const mockFn = jest.fn()

    render(
      <TransferComponent actualBalance={0} onHandleAddTransactions={mockFn} onHandleSumTransactions={mockFn} />
    );

    const getDisabledButton = screen.getByRole<HTMLInputElement>("button", {name: "Enviar" })

    expect(getDisabledButton).toBeDisabled()
  })
});