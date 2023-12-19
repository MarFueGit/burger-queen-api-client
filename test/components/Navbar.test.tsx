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
    fireEvent.click(getByText("Pedidos"));
    fireEvent.click(getByText("Trabajadores"));
    fireEvent.click(getByText("Productos"));
    fireEvent.click(getByText("Cerrar sesión"));

    // 3. Verificar // Assert
    expect(getByText("Pedidos", { selector: "a.active" })).not.toBeNull();
    expect(getByText(/Trabajadores/).textContent).toBe("Trabajadores");
    expect(getByText(/Productos/).textContent).toBe("Productos");
    expect(getByText(/Cerrar sesión/).textContent).toBe("Cerrar sesión");
  });
});
