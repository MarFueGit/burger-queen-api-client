import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import imgCoffeMilk from "../assets/coffe-milk-removebg-preview.png";
import imgSandwich from "../assets/sandwiche-removebg-preview.png";
import imgJugoFruta from "../assets/jugospng.png";
import imgCoffeAmericano from "../assets/cafe-americano-removebg.png";
import "./IngresarPedido.css";
import ConfirmacionPedido from "./ConfirmacionPedido";
import { getProducts } from "../services/products.service";
import { Product } from "../types/types";
import { getUniqueTiposMenu } from "../utils";

export default function IngresarPedido() {
  // Hook que abre y cierra el modal de confirmacion
  const [confirm, setConfirm] = useState<boolean>(false);
  // hook para guardar el tipo de menu actual
  const [menuSelected, setMenuSelected] = useState<string>("Desayunos");
  // Hook para guardar tipos de menu
  const [tiposDeMenu, setTiposDeMenu] = useState<string[]>([]);
  // Hook para guardar el array de productos
  const [products, setProducts] = useState<Product[]>([]);
  // Hook para guardar el array de productos de reserva, este solo lo usare de lectura
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((products: Product[]) => {
        setAllProducts(products);
        filterProducts(products, menuSelected);
        // filtramos los tipos de menu
        const tiposMenuFiltrados = getUniqueTiposMenu(products);
        setTiposDeMenu(tiposMenuFiltrados);
      })
      .catch((error) => console.log("ERROR: ", error));
  }, []);

  const filterProducts = (products: Product[], tipoMenu: string): void => {
    setMenuSelected(tipoMenu);
    const filteredProducts = products.filter(
      (product: Product) => product.type === tipoMenu
    );

    setProducts(filteredProducts);
  };

  return (
    <>
      <Navbar />
      <section className="section-home">
        <div className="button-home">
          {tiposDeMenu.map((tipoMenu: string, index: number) => (
            <button
              className={
                tipoMenu === menuSelected ? "tipo-menu-active" : "button-menu"
              }
              key={index}
              onClick={() => filterProducts(allProducts, tipoMenu)}
            >
              {tipoMenu}
            </button>
          ))}
        </div>
        <div className="list-menu">
          {products.map((product: Product, index: number) => (
            <div className="breackfa" key={index}>
              <img src={product.image} alt={product.name} />
              <p>
                {product.name}
                <br />${product.price}
              </p>
              <button className="button-agregar">Agregar</button>
            </div>
          ))}
        </div>

        <div className="item-table">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Precio</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cafe americano</td>
                <td>$5.00</td>
                <td>
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
              <tr>
                <td>Sandwich de jamón y queso</td>
                <td>$10.00</td>
                <td>
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
              <tr>
                <td>Jugo natural</td>
                <td>$7.00</td>
                <td>
                  <i className="fa-solid fa-trash"></i>
                </td>
              </tr>
              <tr>
                <td>Total</td>
                <td>$22.00</td>
              </tr>
              <tr>
                <td>
                  <button
                    className="button-table"
                    onClick={() => setConfirm(true)}
                  >
                    Enviar a cocina
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <ConfirmacionPedido
        open={confirm}
        setOpen={(open) => setConfirm(open)}
        onConfirm={() => {}}
      />
    </>
  );
}
