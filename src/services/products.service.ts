import { Product } from "../types/types";

// Esta function obtiene el array de productos
export const getProducts = (): Promise<Product[]> =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(`https://mary-burger-queen-api-mock.onrender.com/products`, options)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
