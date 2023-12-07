import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./HistorialPedidos.css";
import { Order, OrderProduct } from "../types/types";
import { getOrders } from "../services/orders.service";

export default function HistorialPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getOrders()
      .then((orders: Order[]) => {
        console.log("dame las ordenes:", orders);
        setOrders(orders);
        setLoading(false);
      })
      .catch((error) => console.log("ERROR: ", error));
  }, [loading]);

  return (
    <>
      <Navbar />
      <section className="container-table">
        <table className="table">
          <caption>Historial de pedidos</caption>
          <thead>
            <tr>
              <th>Num. de orden</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Fecha creado</th>
              <th>Fecha terminado</th>
              <th>Estatus</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order, index: number) => (
              <tr key={`${order.dataEntry}-${index}`}>
                <td data-label="Num. de orden">{order.id}</td>
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
                <td data-label="Fecha">{order.dateProcessed}</td>
                <td data-label="Status">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
