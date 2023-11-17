import { login } from "../../../src/services/auth.service";

// Mockea el fetch
global.fetch = jest
  .fn()
  .mockImplementation(() => Promise.reject(new Error("Error")));

describe("auth.service.ts", () => {
  it("login retorna error ", async () => {
    /* Preparar: declaramos las variables que necesitamos para el test
    Ejemplos: en este caso tenemos, un email y un password. por que login necesita
    que se lo pasemos.
*/
    const email = "marfue@gmail.com";
    const password = "mar1234789";

    try {
      // Actuar: En este caso no interactuamos,solo invocamos a la funcion login
      await login(email, password);
    } catch (error) {
      // Verificar: Entonces como el fetch nos devuelve error, verificamos que no sea indefinido
      expect(error).not.toBeUndefined();
    }
  });
});
