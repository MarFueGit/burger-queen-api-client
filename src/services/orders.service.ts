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
    fetch(`https://mary-burger-queen-api-mock.onrender.com/orders`, options)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });

export const getOrders = (): Promise<Order[]> =>
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
    fetch(`https://mary-burger-queen-api-mock.onrender.com/orders`, options)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });

export const updateOrder = (
  id: number | undefined,
  status: string,
  dateProcessed: string
): Promise<Order> =>
  new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    const options = {
      method: "PATCH",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, dateProcessed }),
    };
    fetch(`https://mary-burger-queen-api-mock.onrender.com/orders/${id}`, options)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
