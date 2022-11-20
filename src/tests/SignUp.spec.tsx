import React from "react"
import SignUp from "../../pages/signup"
import { render, screen } from "@testing-library/react"
import mockRouter from 'next-router-mock';

jest.mock('next/router', () => require('next-router-mock'));
jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe("SignUp component", () => {
  beforeEach(() => {
    mockRouter.setCurrentUrl("/signup");
  });

  it("SignUp is rendering correctly", () => {
    render(
      <SignUp />
    );

    expect(screen.getByText("Cadastre-se")).toBeInTheDocument();
  })

  it("Button to do signup is disabled by default value", () => {
    render(
      <SignUp />
    );

    const getDisabledButton = screen.getByRole<HTMLInputElement>("button", {name: "Cadastrar" })

    expect(getDisabledButton).toBeDisabled()
  })
});