import React from "react"
import { TotalBalance } from "."
import { render, screen } from "@testing-library/react"

describe("TotalBalance component", () => {
  it("TotalBalance is rendering correctly", () => {

    render(
      <TotalBalance  />
    );

    expect(screen.getByText("Balanço")).toBeInTheDocument();
    expect(screen.getByText("*Saldo atual")).toBeInTheDocument();
  })


  it("TotalBalance is receiving props correctly", () => {

    render(
      <TotalBalance userBalance="100" />
    );

    expect(screen.getByText("Balanço")).toBeInTheDocument();
    expect(screen.getByText("R$ 100,00")).toBeInTheDocument();
    expect(screen.getByText("*Saldo atual")).toBeInTheDocument();
  })
});