import { Dispatch, SetStateAction } from "react";
import { Order, OrderProduct, Product } from "../../types/types";

interface TablaOrdenProps {
  userOrder: Order;
  removeProduct: (product: Product) => void;
  setConfirm: Dispatch<SetStateAction<boolean>>;
  setUserOrder: Dispatch<SetStateAction<Order>>;
}

export default function TablaOrden({
  userOrder,
  removeProduct,
  setConfirm,
  setUserOrder,
}: TablaOrdenProps) {
  //Funcion para agregar productos a la orden del usuario
  const addProduct = (product: Product): void => {
    const arrayProducts: OrderProduct[] = userOrder.products;
    const indexExist: OrderProduct | number = arrayProducts.findIndex(
      (order: OrderProduct) => order.product.id === product.id
    );
    if (indexExist > -1) {
      arrayProducts[indexExist] = {
        product: arrayProducts[indexExist].product,
        qty: arrayProducts[indexExist].qty + 1,
      };
    }
    setUserOrder({
      ...userOrder,
      products: arrayProducts,
    });
  };

  //Funcion para restar producto a la orden del usuario
  const minusProduct = (product: Product): void => {
    const arrayProducts: OrderProduct[] = userOrder.products;
    const indexExist: OrderProduct | number = arrayProducts.findIndex(
      (order: OrderProduct) => order.product.id === product.id
    );
    if (indexExist > -1 && arrayProducts[indexExist].qty > 1) {
      arrayProducts[indexExist] = {
        product: arrayProducts[indexExist].product,
        qty: arrayProducts[indexExist].qty - 1,
      };
    } else {
      // La funcion splice borra un elemento en la posicion especifica
      arrayProducts.splice(indexExist, 1);
    }
    setUserOrder({
      ...userOrder,
      products: arrayProducts,
    });
  };

  return (
    <div className="section-derecha">
      <table className="table ">
        <thead>
          <tr>
            <th>Articulo</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {userOrder.products.map((order: OrderProduct, index: number) => (
            <tr key={index}>
              <td data-label="Articulo">{order.product.name}</td>
              <td data-label="Precio">${order.product.price}</td>
              <td data-label="Cantidad" className="cantidad">
                <i
                  className="fa-solid fa-minus"
                  onClick={() => minusProduct(order.product)}
                  onKeyUp={() => {}}
                  key={index}
                  data-testid={"minus-icon"}
                ></i>
                {order.qty}
                <i
                  className="fa-solid fa-plus"
                  onClick={() => addProduct(order.product)}
                  onKeyUp={() => {}}
                  key={index}
                  data-testid={"plus-icon"}
                ></i>
              </td>
              <td data-label="Acción">
                <i
                  className="fa-solid fa-trash"
                  onClick={() => removeProduct(order.product)}
                  onKeyUp={() => {}}
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
