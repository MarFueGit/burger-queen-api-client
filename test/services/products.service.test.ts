import { getProducts } from "../../src/services/products.service";

// Mockea el fetch
// Mockea el fetch
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        {
          id: 1,
          name: "Café Americano",
          price: 5,
          image:
            "https://raw.githubusercontent.com/ssinuco/burger-queen-api-mock/main/resources/images/coffee.png",
          type: "Desayunos",
          dateEntry: "2022-03-05 15:14:10",
        },
        {
          id: 2,
          name: "Café con leche",
          price: 7,
          image:
            "https://github.com/MarFueGit/burger-queen-api-mock/blob/main/resources/images/coffe-milk-removebg-preview.png?raw=true",
          type: "Desayunos",
          dateEntry: "2022-03-05 15:14:10",
        },
      ]),
  })
);

describe("products.service", () => {
  it("getProducts retorna products ", async () => {
    /* Preparar: declaramos las variables que necesitamos para el test
     */

    // Actuar: En este caso no interactuamos,solo invocamos a la funcion login
    const response = await getProducts();

    // Verificar: Entonces como el fetch nos devuelve error, verificamos que no sea indefinido
    expect(response.length).not.toBe(0);
  });
});
