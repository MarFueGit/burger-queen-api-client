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
