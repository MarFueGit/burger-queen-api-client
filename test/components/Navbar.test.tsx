import React from "react";
import Navbar from "../../src/components/Navbar";
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Navbar components", () => {
  it("should render Navbar with navigation links", () => {
    // 1. Preparar / arrange
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Actuar / Act
    // damos click en logo burguer
    fireEvent.click(getByAltText("logoBurger"));
    fireEvent.click(getByText("Ingresar pedido"));
    fireEvent.click(getByText("ver pedidos"));
    fireEvent.click(getByText("pedidos listos"));
    fireEvent.click(getByText("Historial de pedidos"));
    fireEvent.click(getByText("Cerrar sesión"));

    // 3. Verificar // Assert
    expect(getByText(/Ingresar pedido/).textContent).toBe("Ingresar pedido");
    expect(getByText(/ver pedidos/).textContent).toBe("ver pedidos");
    expect(getByText(/pedidos listos/).textContent).toBe("pedidos listos");
    expect(getByText(/Historial de pedidos/).textContent).toBe(
      "Historial de pedidos"
    );
  });
});
