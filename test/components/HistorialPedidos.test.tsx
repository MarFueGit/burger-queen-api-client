import React from "react";
import HistorialPedidos from "../../src/components/HistorialPedidos";
import { render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { getOrders } from "../../src/services/orders.service";

// Mock the products.service module
jest.mock("../../src/services/orders.service", () => ({
  getOrders: jest.fn(),
  
}));
describe("HistorialPedidos components", () => {
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
      status: "delivered",
      dataEntry: "2022-03-05 15:00",
      dateProcessed: "30-11-2023 20:32:27",
    },
    {
      id: 2,
      userId: 2,
      client: "Katie Bouman",
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
      status: "done",
      dataEntry: "2022-03-05 15:00",
      dateProcessed: "04-12-2023 15:52:41",
    },
    {
      client: "Panchito",
      dataEntry: "2022-03-05 15:00",
      products: [
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
      id: 3,
      dateProcessed: "30-11-2023 20:35:51",
    },
    {
      client: "",
      dataEntry: "2022-03-05 15:00",
      products: [
        {
          qty: 1,
          product: {
            id: 1,
            name: "Café Americano",
            price: 5,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
            type: "Desayunos",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
        {
          qty: 1,
          product: {
            id: 2,
            name: "Café con leche",
            price: 7,
            image:
              "https://github.com/MarFueGit/burger-queen-api-mock/blob/main/resources/images/coffe-milk-removebg-preview.png?raw=true",
            type: "Desayunos",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
        {
          qty: 1,
          product: {
            id: 10,
            name: "Sándwich de huevo frito",
            price: 80,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/fried-egg.png",
            type: "Desayunos",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
      ],
      status: "delivered",
      id: 4,
      dateProcessed: "04-12-2023 15:52:42",
    },
    {
      client: "mary",
      dataEntry: "2022-03-05 15:00",
      products: [
        {
          qty: 1,
          product: {
            id: 2,
            name: "Café con leche",
            price: 7,
            image:
              "https://github.com/MarFueGit/burger-queen-api-mock/blob/main/resources/images/coffe-milk-removebg-preview.png?raw=true",
            type: "Desayunos",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
        {
          qty: 1,
          product: {
            id: 10,
            name: "Sándwich de huevo frito",
            price: 80,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/fried-egg.png",
            type: "Desayunos",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
        {
          qty: 1,
          product: {
            id: 1,
            name: "Café Americano",
            price: 5,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
            type: "Desayunos",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
        {
          qty: 1,
          product: {
            id: 9,
            name: "Sándwich de jamón y queso",
            price: 70,
            image:
              "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
            type: "Desayunos",
            dateEntry: "2022-03-05 15:14:10",
          },
        },
      ],
      status: "delivered",
      id: 5,
      dateProcessed: "30-11-2023 20:35:52",
    },
  ];
 

  it("Renderizame el historial de pedidos ", async () => {
    // 1. Preparar / arrange
    (getOrders as jest.Mock).mockResolvedValue(mockOrdenes);

    const { getByText, getAllByText } = render(
      <BrowserRouter>
        <HistorialPedidos />
      </BrowserRouter>
    );

    // Wait for products to be loaded
    await waitFor(() => expect(getOrders).toHaveBeenCalled());

// Assert / verificar
    expect(getByText(/Jude Milhon/)).not.toBeNull();
    expect(getAllByText(/pending/)).not.toBeNull();
    expect(getAllByText(/delivered/)).not.toBeNull();
    expect(getAllByText(/done/)).not.toBeNull();
  
  });

  it("error al obtener el historial de pedidos", () => {
    (getOrders as jest.Mock).mockRejectedValue(new Error("Error al obtener"));

    try {
      render(
        <BrowserRouter>
          <HistorialPedidos />
        </BrowserRouter>
      );
    } catch (error) {
      expect(error).toBe("Error al obtener");
    }
  });
});
