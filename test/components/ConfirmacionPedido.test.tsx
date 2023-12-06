import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import ConfirmacionPedido from "../../src/components/ConfirmacionPedido";
import { BrowserRouter } from "react-router-dom";
import { Order } from "../../src/types/types";
import { sendOrder } from "../../src/services/orders.service";

jest.mock("../../src/services/orders.service", () => ({
  sendOrder: jest.fn(),
}));

describe("Confirmacionpédido", () => {
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

  it("renderiza el modal de forma correcta y lo cierra", () => {
    const { getByText, getByTestId } = render(
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

    expect(
      getByText("Escriba nombre del cliente y confirme pedido").textContent
    ).toBe("Escriba nombre del cliente y confirme pedido");

    //2. Actuar - Cerramos el modal
    fireEvent.click(getByTestId("closeModalDiv"));
    //Verifiquemos que si se mando a cerrar el modal con setOpen
    //3. Assert
    expect(setOpen).toBeCalled();
  });

  it("renderiza el modal de forma correcta y lo cierra con el boton cerrar", () => {
    const { getByText, getByTestId } = render(
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

    expect(
      getByText("Escriba nombre del cliente y confirme pedido").textContent
    ).toBe("Escriba nombre del cliente y confirme pedido");

    //Act/Actuar. Cerramos el modal
    fireEvent.click(getByTestId("closeModal"));
    //Assert/Verificar. Verifiquemos que si se mando a cerrar el modal con setOpen
    expect(setOpen).toBeCalled();
  });

  it("renderiza el modal de forma correcta, llena el nombre y envia la orden", async () => {
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

    //Act . Llenamos el input
    fireEvent.change(getByPlaceholderText("Nombre del cliente"), {
      target: { value: "Mary" },
    });

    // Act. Enviamos l orden
    //Y confirmamos el pedido para enviar a cocina
    fireEvent.click(getByText("Confirmar"));

    //Mock de sendOrder
    (sendOrder as jest.Mock).mockResolvedValue({});
    //Act.
    await waitFor(() => expect(sendOrder).toHaveBeenCalled());
    // Assert / Verificamos que se cierre el modal y resete la orden
    expect(getByText(/Éxito/)).not.toBeNull();
  });

  it("renderiza el modal de forma correcta pero cancela el envio", async () => {
    const { getByPlaceholderText, getByTestId } = render(
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

    //Act. Llenamos el input
    fireEvent.change(getByPlaceholderText("Nombre del cliente"), {
      target: { value: "Mary" },
    });

    // Act. Enviamos la orden
    //Y confirmamos el pedido para enviar a cocina
    fireEvent.click(getByTestId("cancelarEnviar"));
    //Assert que si haya cerrado el modal
    expect(setOpen).toBeCalled(); //ToBeCalled: ser llamado o llamo a
  });
});
