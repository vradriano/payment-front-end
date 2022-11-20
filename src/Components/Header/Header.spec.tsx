import React from "react"
import { Header } from "."
import { render, screen } from "@testing-library/react"

describe("Header component", () => {
  it("Header is rendering correctly", () => {
    render(
      <Header username={null} />
    );

    expect(screen.getByText("Login")).toBeInTheDocument()
    expect(screen.getByText("Signup")).toBeInTheDocument()
  })
});