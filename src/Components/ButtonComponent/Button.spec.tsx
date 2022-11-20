import React from "react"
import { ButtonComponent } from "."
import { render, screen } from "@testing-library/react"


describe("Button component", () => {
  it("Button is rendering correctly", () => {

    render(
      <ButtonComponent isDisabled={false} text={"Entrar"} />
    );
    
    expect(screen.getByText("Entrar")).toBeInTheDocument()
  })

  it("Button is disabled when isDisabled true", () => {

    render(
      <ButtonComponent isDisabled={true} text={"Entrar"} />
    );
    
    expect(screen.getByText("Entrar")).toBeDisabled()
  })
});