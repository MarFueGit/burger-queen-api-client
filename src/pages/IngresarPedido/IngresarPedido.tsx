import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import "./IngresarPedido.css";
import ConfirmacionPedido from "../../components/ConfirmacionPedido";
import { getProducts } from "../../services/products.service";
import { Order, OrderProduct, Product } from "../../types/types";
import { dateNow, getUniqueTiposMenu } from "../../utils";
import TablaProductos from "../../components/TablaProductos/TablaProductos";
import TablaOrden from "../../components/TablaOrden/TablaOrden";

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
    dataEntry: dateNow(),
    products: [],
    status: "pending",
    dateProcessed: "",
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

  //Funcion para eliminar productos
  const removeAllProducts = (product: Product): void => {
    const arrayProducts: OrderProduct[] = userOrder.products.filter(
      (order: OrderProduct) => order.product.id !== product.id
    );
    setUserOrder({
      ...userOrder,
      products: arrayProducts,
    });
  };

  const filterProducts = (products: Product[], tipoMenu: string): void => {
    setMenuSelected(tipoMenu);
    const filteredProducts = products.filter(
      (product: Product) => product.type === tipoMenu
    );

    setProducts(filteredProducts);
  };

  //Agregamos el nombre del clinte de tipo string y lo seteamos dentro de setUserOrder.
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
      dateProcessed: "",
    });
  };

  return (
    <>
      <Navbar />
      {/* Toast Exito  */}
      <section id="section-home">
        {/* Fin Toast Exito */}
        <TablaProductos
          tiposDeMenu={tiposDeMenu}
          allProducts={allProducts}
          menuSelected={menuSelected}
          products={products}
          setUserOrder={setUserOrder}
          userOrder={userOrder}
          filterProducts={filterProducts}
        />
        <TablaOrden
          removeProduct={removeAllProducts}
          setConfirm={setConfirm}
          userOrder={userOrder}
          setUserOrder={setUserOrder}
        />
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
