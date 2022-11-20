import React from "react"
import { InputComponent } from "."
import { render, screen } from "@testing-library/react"


describe("Input component", () => {
  it("Input is rendering correctly", () => {
    const mockFn = jest.fn()

    render(
      <InputComponent 
        name="Name" 
        title="Name" 
        type="text" 
        value="Ngcash"
        onChange={mockFn}
      />
    );
 
    expect(screen.getByText("Name")).toBeInTheDocument()
  })
});