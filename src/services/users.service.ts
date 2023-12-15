import { User } from "../types/types";

// Esta function obtiene el array de productos
export const getUsers = (): Promise<User[]> =>
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
    fetch(`https://burger-queen-api-mock-mary.vercel.app/users`, options)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });