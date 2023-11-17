import React from "react";
import { BrowserRouter } from "react-router-dom";
import Login from "../../src/components/Login";
import userEvent from "@testing-library/user-event";
import { render } from "@testing-library/react";

jest.mock("../../src/services/auth.service", () => ({
  login: () =>
    new Promise((resolve) => {
      return resolve({
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN5c3RlcnMueHl6IiwiaWF0IjoxNzAwMTY3NzkzLCJleHAiOjE3MDAxNzEzOTMsInN1YiI6IjEifQ.uzJBBp0S_2pddLtwCL42rXajKuzogTXO22WwG_Tlu_k",
        user: {
          email: "admin@systers.xyz",
          role: "admin",
          id: 1,
        },
      });
    }),
}));
// mock de console.log

let consoleLogSpy: jest.SpyInstance;
let consoleErrorSpy: jest.SpyInstance;

beforeEach(() => {
  consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  consoleLogSpy.mockRestore();
  consoleErrorSpy.mockRestore();
});
describe("Login components", () => {
  it("debe redirigir al home si las credenciales son correctas", async () => {
    /* 1. Preparar / arrange: renderizamos login dentro de BrowserRouter
      por que es una ruta. */

    const { getByTestId } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    // 2. Actuar / Act: Interactuamos llenando el email, password y haciendo click al boton.

    // referenciamos nuestros inputs y boton
    const email = getByTestId("inputEmail");
    const password = getByTestId("inputPassword");
    const button = getByTestId("buttonLogin");
    // llenamos el input email
    await userEvent.type(email, "admin@systers.xyz");
    //Llenamos password
    await userEvent.type(password, "123456");
    //Damos click en signin
    await userEvent.click(button);

    /* 3. Verificar // Assert: 
      Asegurarse que el resultado de la interacción es el esperado.

    */
    expect(window.location.pathname).toBe("/");
  });
});
