import React from "react";
import Navbar from "./Navbar";
import "./VerPedidos.css";
export default function verPedidos() {
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
