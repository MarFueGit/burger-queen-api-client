import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./VerPedidos.css";
import { Order, OrderProduct } from "../types/types";
import { getOrders, updateOrder } from "../services/orders.service";
import { dateNow } from "../utils";

export default function VerPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getOrders()
      .then((orders: Order[]) => {
        console.log("dame las ordenes:", orders);
        setOrders(orders);
      })
      .catch((error) => console.log("ERROR: ", error));
  }, [loading]);

  const updateOrderById = async (id: number | undefined, status: string) => {
    setLoading(true);
    const response = await updateOrder(id, status, dateNow());
    console.log("que nos regresa la api:", response);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <section className="container-table">
        <table className="table">
          <caption>Ultimas Ordenes</caption>
          <thead>
            <tr>
              <th>Num. de orden</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Fecha</th>
              <th>Estatus</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order, index: number) => (
              <tr key={`${order.dataEntry}-${index}`}>
                <td data-label="Num. de orden">{index}</td>
                <td data-label="Cliente">
                  {order.client === "" ? "Invitado" : order.client}
                </td>
                <td data-label="Producto">
                  <ul>
                    {order.products.map((product: OrderProduct, i: number) => (
                      <li key={i}>
                        {product.qty} {product.product.name}
                      </li>
                    ))}
                  </ul>
                </td>
                <td data-label="Fecha">{order.dataEntry}</td>
                <td data-label="Total">{order.status}</td>
                <td data-label="Acción">
                  <button
                    onClick={() => updateOrderById(order.id, "done")}
                    disabled={loading}
                  >
                    {loading ? "Actualizando" : "Marcar como terminado"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
