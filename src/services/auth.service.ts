import { Token } from "../types/types";

// Esta function obtiene el token de authenticacion
export const login = (email: string, password: string): Promise<Token> =>
  new Promise((resolve, reject) => {
    const data = {
      email,
      password,
    };
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`http://localhost:8080/login`, options)
      .then((response) => response.json())
      .then((response) => resolve(response))
      .catch((err) => reject(err));
  });
