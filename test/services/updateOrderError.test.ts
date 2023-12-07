import { updateOrder } from "../../src/services/orders.service";

global.fetch = jest
  .fn()
  .mockImplementation(() => Promise.reject(new Error("Error al actualizar")));

describe("order.service", () => {
  it("updateOrder retorna error al actualizar", async () => {
    const id = 1;
    const status = "delivered";
    const dateProcessed = "2022-03-05 15:00";
    try {
      await updateOrder(id, status, dateProcessed);
    } catch (error) {
      expect(error.message).toBe("Error al actualizar");
    }
  });
});
