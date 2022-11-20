import React from "react"
import Toasty from "."
import { render, screen, within } from "@testing-library/react"

describe("Toasty component", () => {
  it("Toasty is rendering and receiving props correctly", () => {
    const mockFn = jest.fn()

    render(
      <Toasty open={true} text="Ng.cash" severity="success" onClose={mockFn} />
    );

    expect(screen.getByText("Ng.cash")).toBeInTheDocument()
  })
});