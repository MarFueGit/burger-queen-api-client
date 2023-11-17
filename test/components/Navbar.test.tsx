import React from "react";
import Navbar from "../../src/components/Navbar";
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Navbar components", () => {
  it("should render Navbar with navigation links", () => {
    // 1. Preparar / arrange
    const { getByText } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    // Actuar / Act
    fireEvent.click(getByText("Cerrar sesión"));

    // 3. Verificar // Assert
    expect(getByText(/BURGER QUEEN/)).not.toBeUndefined();
  });
});
