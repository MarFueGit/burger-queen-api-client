import { getOrders } from "../../src/services/orders.service";
global.fetch = jest
  .fn()
  .mockImplementation(() =>
    Promise.reject(new Error("Error al obtener ordenes"))
  );

describe("order.service", () => {
  it("getOrders retorna error al obtener ordenes", async () => {
    try {
      await getOrders();
    } catch (error) {
      expect(error.message).toBe("Error al obtener ordenes");
    }
  });
});
