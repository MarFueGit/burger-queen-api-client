import React, { Dispatch, SetStateAction } from "react";
import { Order, OrderProduct, Product } from "../../types/types";

interface TablaProductosProps {
  tiposDeMenu: string[];
  products: Product[];
  menuSelected: string;
  allProducts: Product[];
  userOrder: Order;
  setUserOrder: Dispatch<SetStateAction<Order>>;
  filterProducts: (products: Product[], tipoMenu: string) => void;
}

export default function TablaProductos({
  tiposDeMenu,
  products,
  menuSelected,
  allProducts,
  userOrder,
  setUserOrder,
  filterProducts,
}: TablaProductosProps) {
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

  return (
    <div className="section-izquierda">
      <div className="menu">
        {tiposDeMenu?.map((tipoMenu: string, index: number) => (
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
        {products?.map((product: Product, index: number) => (
          <div className="breackfa" key={index}>
            <img src={product.image} alt={product.name} />
            <p>
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
    </div>
  );
}
