import React from "react";
import VerPedidos from "../../src/components/VerPedidos";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { getOrders, updateOrder } from "../../src/services/orders.service";

// Mock the products.service module
jest.mock("../../src/services/orders.service", () => ({
  getOrders: jest.fn(),
  updateOrder: jest.fn(),
}));
describe("VerPedidos components", () => {
  //1. Prepare
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

  const mockOrdenes = [
    {
      id: 1,
      userId: 2,
      client: "Jude Milhon",
      products: [
        {
          qty: 1,
          product: {
            id: 9,
            name: "Sándwich de jamón y queso",
            price: 70,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
            type: "Desayuno",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
        {
          qty: 1,
          product: {
            id: 1,
            name: "Café Americano",
            price: 40,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
            type: "Bebidas",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
      ],
      status: "pending",
      dataEntry: "2022-03-05 15:00",
    },
    {
      id: 2,
      userId: 2,
      client: "",
      products: [
        {
          qty: 2,
          product: {
            id: 1,
            name: "Café Americano",
            price: 40,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
            type: "Bebidas",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
        {
          qty: 1,
          product: {
            id: 2,
            name: "Agua 500ml",
            price: 20,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/water.png",
            type: "Bebidas",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
      ],
      status: "pending",
      dataEntry: "2022-03-05 15:00",
      dateProcessed: "04-12-2023 15:52:41",
    },
  ];

  const mockUpdateOrder = {
    id: 1,
    userId: 2,
    client: "Jude Milhon",
    products: [
      {
        qty: 1,
        product: {
          id: 9,
          name: "Sándwich de jamón y queso",
          price: 70,
          image:
            "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
          type: "Desayuno",
          dateEntry: "2022-03-05 15:14:10",
        },
      },
      {
        qty: 1,
        product: {
          id: 1,
          name: "Café Americano",
          price: 40,
          image:
            "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
          type: "Bebidas",
          dateEntry: "2022-03-05 15:14:10",
        },
      },
    ],
    status: "pending",
    dataEntry: "2022-03-05 15:00",
  };

  it("Renderizame la orden pedida ", async () => {
    //1. Prepare
    (getOrders as jest.Mock).mockResolvedValue(mockOrdenes);

    const { getByText, getAllByText } = render(
      <BrowserRouter>
        <VerPedidos />
      </BrowserRouter>
    );

    //Act.
    // Wait for products to be loaded
    await waitFor(() => expect(getOrders).toHaveBeenCalled());
    // Assert/Verificar
    expect(getByText(/Jude Milhon/)).not.toBeNull();

    (updateOrder as jest.Mock).mockResolvedValue(mockUpdateOrder);
    //Act
    fireEvent.click(getAllByText("Marcar como terminado")[0]);
    // Assert/Verificar
    expect(getAllByText(/pending/)).not.toBeNull();
  });

  it("error al obtener las ordenes", () => {
    //Prepare
    (getOrders as jest.Mock).mockRejectedValue(new Error("Error al obtener"));

    try {
      render(
        <BrowserRouter>
          <VerPedidos />
        </BrowserRouter>
      );
    } catch (error) {
      // Assert/Verificar
      expect(error).toBe("Error al obtener");
    }
  });
});
