import Navbar from "../../src/components/Navbar";
import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

describe("Navbar components", () => {
  it("should ", () => {
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
