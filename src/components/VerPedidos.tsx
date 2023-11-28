import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./VerPedidos.css";
import { Order } from "../types/types";
import { getOrders } from "../services/orders.service";

export default function VerPedidos() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    getOrders()
      .then((orders: Order[]) => {
        console.log("dame las ordenes:", orders)
      })
      .catch((error) => console.log("ERROR: ", error));
  }, []);

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
              <th>Total</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td data-label="Num. de orden">001</td>
              <td data-label="Cliente">Juan Perez</td>
              <td data-label="Producto">
                <ul>
                  <li>1 Pizza</li>
                  <li>1 Ensalada</li>
                  <li>1 Jugo</li>
                </ul>
              </td>
              <td data-label="Fecha">15:35</td>
              <td data-label="Total">$40.00</td>
              <td data-label="Acción">
                <button>Comenzar a preparar</button>
              </td>
            </tr>
            <tr>
              <td data-label="Num. de orden">001</td>
              <td data-label="Cliente">Juan Perez</td>
              <td data-label="Producto">Pizza, Ensalada, Jugo</td>
              <td data-label="Fecha">15:35</td>
              <td data-label="Total">$40.00</td>
              <td data-label="Acción">
                <button>Comenzar a preparar</button>
              </td>
            </tr>
            <tr>
              <td data-label="Num. de orden">001</td>
              <td data-label="Cliente">Juan Perez</td>
              <td data-label="Producto">Pizza, Ensalada, Jugo</td>
              <td data-label="Fecha">15:35</td>
              <td data-label="Total">$40.00</td>
              <td data-label="Acción">
                <button>Comenzar a preparar</button>
              </td>
            </tr>
            <tr>
              <td data-label="Num. de orden">001</td>
              <td data-label="Cliente">Juan Perez</td>
              <td data-label="Producto">Pizza, Ensalada, Jugo</td>
              <td data-label="Fecha">15:35</td>
              <td data-label="Total">$40.00</td>
              <td data-label="Acción">
                <button>Comenzar a preparar</button>
              </td>
            </tr>
            <tr>
              <td data-label="Num. de orden">001</td>
              <td data-label="Cliente">Juan Perez</td>
              <td data-label="Producto">Pizza, Ensalada, Jugo</td>
              <td data-label="Fecha">15:35</td>
              <td data-label="Total">$40.00</td>
              <td data-label="Acción">
                <button>Comenzar a preparar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
}
