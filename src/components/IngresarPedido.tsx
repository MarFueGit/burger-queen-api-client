import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./IngresarPedido.css";
import ConfirmacionPedido from "./ConfirmacionPedido";
import { getProducts } from "../services/products.service";
import { Order, OrderProduct, Product } from "../types/types";
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
  const [userOrder, setUserOrder] = useState<Order>({
    client: "",
    dataEntry: "",
    products: [],
    status: "pending",
  });

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

  //Funcion para agregar productos a la orden del usuario
  const addProduct = (product: Product): void => {
    const productOrder: OrderProduct = {
      qty: 1,
      product,
    };
    const arrayProducts: OrderProduct[] = userOrder.products;
    const indexExist: OrderProduct | number = arrayProducts.findIndex(
      (order: OrderProduct) => order.product.id === product.id
    );
    console.log(" este es un array:", indexExist);
    if (indexExist > -1) {
      arrayProducts[indexExist] = {
        product: arrayProducts[indexExist].product,
        qty: arrayProducts[indexExist].qty + 1,
      };
    } else {
      arrayProducts.push(productOrder);
    }
    setUserOrder({
      ...userOrder,
      products: arrayProducts,
    });
  };

  //Funcion para eliminar productos
  const removeProduct = (product: Product): void => {
    const arrayProducts: OrderProduct[] = userOrder.products.filter(
      (order: OrderProduct) => order.product.id !== product.id
    );
    setUserOrder({
      ...userOrder,
      products: arrayProducts,
    });
  };

  //Agregamos el nombre del clinte de tipo strin y lo seteamos dentro de setUserOrder.
  const addNameClient = (name: string) => {
    setUserOrder({
      ...userOrder,
      client: name,
    });
  };

  const resetOrder = () => {
    setUserOrder({
      client: "",
      dataEntry: "",
      products: [],
      status: "pending",
    });
  };

  return (
    <>
      <Navbar />
      {/* Toast Exito  */}
      <section className="section-home">
        {/* Fin Toast Exito */}
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
              <p >
                {product.name}
                <br />${product.price}
              </p>
              <button
                className="button-agregar"
                onClick={() => addProduct(product)}
              >
                Agregar
              </button>
            </div>
          ))}
        </div>
        <div className="item-table">
          <table className="table">
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
                  <td data-label="Cantidad">{order.qty}</td>
                  <td data-label="Acción">
                    <i
                      className="fa-solid fa-trash"
                      onClick={() => removeProduct(order.product)}
                      key={index}
                    ></i>
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td>
                  $
                  {userOrder.products.reduce(
                    (a, b: OrderProduct) => a + b.product.price * b.qty,
                    0
                  )}
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    className="button-table"
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
      </section>
      <ConfirmacionPedido
        resetOrder={resetOrder}
        order={userOrder}
        addNameClient={addNameClient}
        open={confirm}
        setOpen={(open) => setConfirm(open)}
      />
    </>
  );
}
