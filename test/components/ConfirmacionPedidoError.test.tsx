import { fireEvent, render } from "@testing-library/react";
import { Order } from "../../src/types/types";
import { BrowserRouter } from "react-router-dom";
import ConfirmacionPedido from "../../src/components/ConfirmacionPedido";
import React from "react";

jest.mock("../../src/services/orders.service", () => ({
  sendOrder: () => {
    throw new Error("Fallo al enviar orden");
  },
}));

describe("ConfirmacionPedidoError", () => {
  //1. Prepare
  const open: boolean = true;
  const setOpen = jest.fn();
  const order: Order = {
    client: "",
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
    dateProcessed: "",
  };

  const addNameClient = jest.fn();
  const resetOrder = jest.fn();

  it("renderiza el modal de forma correcta, llena el nombre y envia la orden con error", async () => {
    const { getByPlaceholderText, getByText } = render(
      <BrowserRouter>
        <ConfirmacionPedido
          open={open}
          setOpen={setOpen}
          order={order}
          addNameClient={addNameClient}
          resetOrder={resetOrder}
        />
      </BrowserRouter>
    );

    //Llenamos el input
    fireEvent.change(getByPlaceholderText("Nombre del cliente"), {
      target: { value: "Mary" },
    });

    // Enviamos l orden
    //Y confirmamos el pedido para enviar a cocina
    fireEvent.click(getByText("Confirmar"));

    // Verificamos que se cierre el modal y resete la orden
    expect(getByText(/Fallo al enviar orden/)).not.toBeNull();
  });
});
