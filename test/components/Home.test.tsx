import React from "react";
import Home from "../../src/components/Home";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

describe("Home components", () => {
  it("should render Home with navigation links", () => {
    // 1. Preparar / arrange
    const { getByText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // 3. Verificar // Assert
    expect(getByText("BIENVENIDO").textContent).toBe("BIENVENIDO");
  });
});
