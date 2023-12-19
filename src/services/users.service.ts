import { Token, User } from "../types/types";

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
    fetch(`https://mary-burger-queen-api-mock.onrender.com/users`, options)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });

export const createUser = (
  email: string,
  password: string,
  role: string
): Promise<Token> =>
  new Promise((resolve, reject) => {
    const data = {
      email,
      password,
      role,
    };
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`https://mary-burger-queen-api-mock.onrender.com/users`, options)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
