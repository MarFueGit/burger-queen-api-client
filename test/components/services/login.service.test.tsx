import { login } from "../../../src/services/auth.service";

// Mockea el fetch
// Mockea el fetch
global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
    json: () => Promise.resolve({
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQHN5c3RlcnMueHl6IiwiaWF0IjoxNzAwMTg0MjgyLCJleHAiOjE3MDAxODc4ODIsInN1YiI6IjEifQ.Zg7nE0dHqpcMM--WwJnEJCeiarkSp5pMk1i-ln0M0Lo",
        "user": {
          "email": "admin@systers.xyz",
          "role": "admin",
          "id": 1
        }
      })
  }));

describe("auth.service.ts", () => {
  it("login retorna token ", async () => {
      /* Preparar: declaramos las variables que necesitamos para el test
    Ejemplos: en este caso tenemos, un email y un password. por que login necesita
    que se lo pasemos. */

    const email = "marfue@gmail.com";
    const password = "mar1234789";

    // Actuar: En este caso no interactuamos,solo invocamos a la funcion login
    const response = await login(email, password);

   // Verificar: Entonces como el fetch nos devuelve error, verificamos que no sea indefinido
    expect(response.accessToken).not.toBeUndefined();
  });
});
