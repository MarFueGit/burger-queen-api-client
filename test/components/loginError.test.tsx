import Login from "../../src/components/Login";
import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock("../../src/services/auth.service", () => ({
  login: () =>
    new Promise((resolve) => {
      return resolve("Cannot find user");
    }),
}));

describe("Login Component", () => {
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

  jest.spyOn(global.console, "warn");
  jest.spyOn(global.console, "log");
  jest.spyOn(global.console, "error");

  it("debe mostrar un mensaje de error si los credenciales son incorrectos y oculta el Toast", async () => {
    // 1. Preparar / arrange
    const { getByTestId, getByText } = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    // 2. Actuar / Act
    // referenciamos nuestros inputs y boton
    const email = getByTestId("inputEmail");
    const password = getByTestId("inputPassword");
    const button = getByTestId("buttonLogin");

    // llenamos el input email
    await userEvent.type(email, "marfue@.com");
    //Llenamos password
    await userEvent.type(password, "mar12345");
    //Damos click en signin
    await userEvent.click(button);

    // 3. Verificar // Assert
    expect(getByText("Cannot find user")).not.toBeUndefined();

    // // // referenciamos el toast
    const toast = getByTestId("buttonToast");
    const toastMessage = getByTestId("messageToast").nodeValue;
    //Damos click en buttonToast para ocultarlo
    await userEvent.click(toast);
    expect(toastMessage).toBeNull();
  });
});
