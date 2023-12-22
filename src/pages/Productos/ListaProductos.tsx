import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  deleteProductById,
  getProducts,
} from "../../services/products.service";
import { Product } from "../../types/types";

export default function ListaProductos() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch((error) => console.error("ERROR: ", error));
  }, []);

  return (
    <>
      <Navbar />
      <section className="container-table">
        <div className="boton-trabajador">
          <button onClick={() => navigate("/agregar-producto")}>
            Agregar producto
          </button>
        </div>
        <table className="table">
          <caption>Lista de productos</caption>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Tipo</th>
              <th>Fecha de registro</th>
              <th>Acción</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product: Product) => (
              <tr key={product.id}>
                <td data-label="Id">{product.id}</td>
                <td data-label="Nombre">{product.name}</td>
                <td data-label="Precio">${product.price}</td>
                <td data-label="imagen">
                  <img
                    src={product.image}
                    width={"40px"}
                    height={"40px"}
                    alt="imagen"
                  />
                </td>
                <td data-label="Tipo">{product.type}</td>
                <td data-label="Fecha de registro">{product.dateEntry}</td>
                <td data-label="">
                  <button
                    onClick={() => navigate("/editar-producto/" + product.id)}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                </td>
                <td data-label="">
                  <button
                    onClick={async () => {
                      const productDeleted = await deleteProductById(
                        Number(product.id)
                      );
                      if (productDeleted) {
                        alert("Se elimino el producto");
                        window.location.reload();
                      }
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
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
