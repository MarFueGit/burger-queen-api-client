import { updateOrder } from "../../src/services/orders.service";

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 1,
        client: "Jude Milhon",
        products: [
          {
            qty: 1,
            product: {
              id: 9,
              name: "Sándwich de jamón y queso",
              price: 70,
              image:
                "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/sandwich.png",
              type: "Desayuno",
              dateEntry: "2022-03-05 15:14:10",
            },
          },
          {
            qty: 1,
            product: {
              id: 1,
              name: "Café Americano",
              price: 40,
              image:
                "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
              type: "Bebidas",
              dateEntry: "2022-03-05 15:14:10",
            },
          },
        ],
        status: "pending",
        dataEntry: "2022-03-05 15:00",
        dateProcessed: "",
      }),
  })
);

describe("order.service", () => {
  it("updateOrder retorna la orden actualizada", async () => {
    const id = 1;
    const status = "delivered";
    const dateProcessed = "2022-03-05 15:00";
    const response = await updateOrder(id, status, dateProcessed);
    expect(response).not.toBeNull();
  });
});
