import React from "react"
import { FilterComponent } from "."
import { render, screen } from "@testing-library/react"


describe("FilterComponent component", () => {
  it("FilterComponent is rendering correctly", () => {
    const mockFn = jest.fn() 

    render(
      <FilterComponent onHandleFilterByCategories={mockFn} getAllHistoriesDate={[]} />
    );
    
    expect(screen.getByText("Tipo de transação")).toBeInTheDocument()
    expect(screen.getByText("Data da transação")).toBeInTheDocument()
  })
});