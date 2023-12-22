import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProductById,
} from "../../../services/products.service";
import { Product } from "../../../types/types";

export default function EditarProducto() {
  // usamos el hook useNavigate para navegar a AgregarTrabajador
  const { productId } = useParams();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0.0);
  const [image, setImage] = useState<string>("");
  const [type, setType] = useState<string>("");

  useEffect(() => {
    getProductById(Number(productId))
      .then((product: Product) => {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setType(product.type);
      })
      .catch((error) => console.error("ERROR: ", error));
  }, []);

  const navigate = useNavigate();
  return (
    <section>
      <Navbar />
      <div className="form-container">
        <button onClick={() => navigate("/lista-productos")}>Regresar</button>
        <form
          action=""
          onSubmit={async (e) => {
            e.preventDefault();

            const newProduct: Product = {
              dateEntry: `${new Date()}`,
              id: 0,
              name,
              price,
              image,
              type,
            };

            const response = await updateProductById(
              Number(productId),
              newProduct
            );
            if (response != null) {
              navigate("/lista-productos");
            } else {
              alert("Hubo un error al actualizar");
            }
          }}
        >
          <h2>Editar Producto</h2>
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
