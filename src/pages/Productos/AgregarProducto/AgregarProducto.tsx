import React, { useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/types";
import { createProduct } from "../../../services/products.service";

export default function AgregarProducto() {
  // usamos el hook useNavigate para navegar a AgregarTrabajador
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [image, setImage] = useState<string>("");
  const [type, setType] = useState<string>("");

  return (
    <section>
      <Navbar />
      <div className="form-container">
        <button onClick={() => navigate("/lista-productos")}>Regresar</button>
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();

            const product: Product = {
              dateEntry: `${new Date()}`,
              id: 0,
              image,
              name,
              price: Number(price),
              type,
            };
            const response = await createProduct(product);
            if (response !== null) {
              navigate("/lista-productos");
            } else {
              alert("Hubo un error al crear el producto");
            }
          }}
        >
          <h2>Agregar Producto</h2>
          <label>
            <input
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Ingrese el nombre"
              name="agregarProducto"
            />
          </label>
          <label>
            <input
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
              type="number"
              placeholder="Ingrese el precio"
              name="precio"
              step={"0.01"}
              min={"0"}
              required
            />
          </label>

          <label>
            <input
              onChange={(e) => setImage(e.target.value)}
              value={image}
              type="text"
              placeholder="Imagen"
              name="imagen"
              required
            />
          </label>
          <select
            required
            onChange={(e) => setType(e.target.value)}
            value={type}
            name="role"
            id="roles"
          >
            <option value="">Elige un Tipo de desayuno</option>
            <option value="Desayunos">Desayuno</option>
            <option value="Comidas">Comida</option>
            <option value="Combos">Combo</option>
          </select>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}
