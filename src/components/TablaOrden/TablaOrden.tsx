import React, { Dispatch, SetStateAction } from "react";
import { Order, OrderProduct, Product } from "../../types/types";

interface TablaOrdenProps {
  userOrder: Order;
  removeProduct: (product: Product) => void;
  setConfirm: Dispatch<SetStateAction<boolean>>;
}

export default function TablaOrden({
  userOrder,
  removeProduct,
  setConfirm,
}: TablaOrdenProps) {
  return (
    <div className="section-derecha">
      <table className="table ">
        <thead>
          <tr>
            <th>Item</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {userOrder.products.map((order: OrderProduct, index: number) => (
            <tr key={index}>
              <td data-label="Item">{order.product.name}</td>
              <td data-label="Precio">${order.product.price}</td>
              <td data-label="Cantidad">
                <i
                  className="fa-solid fa-minus"
                  onClick={() => {}}
                  key={index}
                  data-testid={"trash-icon"}
                ></i>
                {order.qty}
                <i
                  className="fa-solid fa-plus"
                  onClick={() => {}}
                  key={index}
                  data-testid={"trash-icon"}
                ></i>
              </td>
              <td data-label="Acción">
                <i
                  className="fa-solid fa-trash"
                  onClick={() => removeProduct(order.product)}
                  key={index}
                  data-testid={"trash-icon"}
                ></i>
              </td>
            </tr>
          ))}
          <tr>
            <td>Total</td>
            <td>
              {`$ ${userOrder.products.reduce(
                (a, b: OrderProduct) => a + b.product.price * b.qty,
                0
              )}`}
            </td>
          </tr>
          <tr>
            <td>
              <button
                id="buttonEnviarCocina"
                onClick={() => {
                  setConfirm(true);
                }}
              >
                Enviar a cocina
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
