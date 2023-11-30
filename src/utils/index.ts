import { Product } from "../types/types";

export const getUniqueTiposMenu = (products: Product[]): string[] => {
  // Utilizar un mapa para rastrear elementos únicos por su tipo
  const uniqueItemsByType = new Map<string, Product>();

  // Filtrar el array para obtener solo elementos únicos por tipo
  const tiposMenuNoRepetidos = products.filter((item) => {
    const existingItem = uniqueItemsByType.get(item.type);

    if (existingItem) {
      // Ya existe un elemento con este tipo, así que comparamos por id y mantenemos el más reciente
      if (item.id > existingItem.id) {
        uniqueItemsByType.set(item.type, item);
      }
      return false;
    } else {
      // No hay elementos con este tipo todavía, así que lo agregamos al mapa
      uniqueItemsByType.set(item.type, item);
      return true;
    }
  });
  // ya filtrados, usamos map para solo retornar la propiedad type
  return tiposMenuNoRepetidos.map((product: Product) => product.type);
};

export const dateNow = (): string => {
  const fecha = new Date();

  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const anio = fecha.getFullYear().toString();

  const hora = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  const segundos = fecha.getSeconds().toString().padStart(2, "0");

  const fechaFormateada = `${dia}-${mes}-${anio}`;
  const horaFormateada = `${hora}:${minutos}:${segundos}`;

  return `${fechaFormateada} ${horaFormateada}`;
};
