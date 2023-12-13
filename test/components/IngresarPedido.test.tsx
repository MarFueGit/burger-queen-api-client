import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import IngresarPedido from "../../src/pages/IngresarPedido/IngresarPedido";
import { getProducts } from "../../src/services/products.service";
import { BrowserRouter } from "react-router-dom";
import { sendOrder } from "../../src/services/orders.service";

// Mock the products.service module
jest.mock("../../src/services/products.service");
jest.mock("../../src/services/orders.service");

describe("IngresarPedido component", () => {
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

  // Mock data for testing
  const mockProducts = [
    {
      id: 1,
      name: "Café Americano",
      price: 5,
      image: "https://example.com/image.jpg",
      type: "Desayunos",
      dateEntry: "2022-03-05 15:14:10",
    },
    {
      id: 8,
      name: "Helado de fresa",
      price: 40,
      image:
        "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/oatmeal.png",
      type: "Comidas",
      dateEntry: "2022-03-05 15:14:10",
    },
    {
      id: 11,
      name: "Hamburguesa clásica",
      price: 100,
      image:
        "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
      type: "Comidas",
      dateEntry: "2022-03-05 15:14:10",
    },
  ];

  it("renders the component with initial data", async () => {
    //1. Preparar

    (getProducts as jest.Mock).mockResolvedValue(mockProducts);
    // Extraemos estas funciones de render
    const {
      getByText,
      getAllByText,
      getAllByTestId,
      getByPlaceholderText,
      getByTestId,
    } = render(
      <BrowserRouter>
        <IngresarPedido />
      </BrowserRouter>
    );

    // Wait for products to be loaded
    await waitFor(() => expect(getProducts).toHaveBeenCalled());

    //2. Actuar
    //Damos click en comidas
    fireEvent.click(getByText("Comidas"));

    //3. Verificar
    // Check if the rendered components are in the document
    expect(getByText(/Helado de fresa/)).not.toBeNull();

    // Agregamos Helado de fresa al pedido
    fireEvent.click(getAllByText(/Agregar/)[0]);

    // Agremaos un nuevo helado de fresa con el boton +
    fireEvent.click(getAllByTestId("plus-icon")[0]);

    // Verificamos que se haya sumado el total de 40
    expect(getByText(/\$ 80/)).not.toBeNull();

    // Agregamos otro helado de fresa, para incrementar 2 helados
    fireEvent.click(getAllByText(/Agregar/)[0]);
    // Verificamos que se haya sumado el total de 80
    expect(getByText(/\$ 120/)).not.toBeNull();

    // Borramos un solo helado de fresa con el boton -
    fireEvent.click(getAllByTestId("minus-icon")[0]);

    // Eliminamos todos los helados de fresa
    fireEvent.click(getAllByTestId("trash-icon")[0]);
    // Verificamos que se haya borrado y sea 0
    expect(getByText(/\$ 0/)).not.toBeNull();

    // Agregamos un hamburgesa y enviamos a ocicna
    fireEvent.click(getAllByText(/Agregar/)[1]);
    // Agregamos un hamburgesa y enviamos a ocicna
    fireEvent.click(getAllByText(/Agregar/)[1]);

    //borramos las dos hamburguesas dando dos click al -
    fireEvent.click(getAllByTestId("minus-icon")[0]);
    fireEvent.click(getAllByTestId("minus-icon")[0]);
    // Verificamos que se haya borrado y sea 0
    expect(getByText(/\$ 0/)).not.toBeNull();

    // Agregamos un hamburgesa y enviamos a ocicna
    fireEvent.click(getAllByText(/Agregar/)[1]);
    fireEvent.click(getByText("Enviar a cocina"));

    // Verificamos que mesutre el modal
    expect(
      getByText("Escriba nombre del cliente y confirme pedido")
    ).not.toBeNull();

    //Llenamos el modal
    fireEvent.change(getByPlaceholderText("Nombre del cliente"), {
      target: { value: "Mary" },
    });
    //Y confirmamos el pedido para enviar a cocina
    fireEvent.click(getByText("Confirmar"));
    //Mock de sendOrder
    (sendOrder as jest.Mock).mockResolvedValue({});
    await waitFor(() => expect(sendOrder).toHaveBeenCalled());
    // Verificamos que se cierre el modal y resete la orden
    expect(getByText(/Éxito/)).not.toBeNull();
    // Cerramos modal
    fireEvent.click(getByTestId("buttonToast"));
    //Verificamos que reseteo la orden
    expect(getByText(/\$ 0/)).not.toBeNull();
  });

  it("error al obtener los productos", () => {
    (getProducts as jest.Mock).mockRejectedValue(new Error("Error al obtener"));

    try {
      render(
        <BrowserRouter>
          <IngresarPedido />
        </BrowserRouter>
      );
    } catch (error) {
      expect(error).toBe("Error al obtener");
    }
  });
});
