import { Order } from "../types/types";

// Esta function envia la orden a la api
export const sendOrder = (order: Order): Promise<Order> =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    };
    fetch(`http://localhost:8080/orders`, options)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
