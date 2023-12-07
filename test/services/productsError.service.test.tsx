import { getProducts } from "../../src/services/products.service";

// Mockea el fetch
global.fetch = jest
  .fn()
  .mockImplementation(() => Promise.reject(new Error("Error")));

describe("products.service", () => {
  it("getProducts retorna error ", async () => {
    try {
      // Actuar
      await getProducts();
    } catch (error) {
      // Verificar: Entonces como el fetch nos devuelve error, verificamos que no sea indefinido
      expect(error.message).toBe("Error");
    }
  });
});
