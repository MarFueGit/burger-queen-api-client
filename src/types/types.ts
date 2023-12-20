export type Token = {
  accessToken: string;
  user: {
    email: string;
    role: string;
    id: number;
  };
};

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  type: string;
  dateEntry: string;
};

export type OrderProduct = {
  qty: number;
  product: Product;
};
export type Order = {
  id?: number; // con el simbolo ?, le decimos a typescript que este atributo es opcional
  client: string;
  products: OrderProduct[];
  status: string;
  dataEntry: string;
  dateProcessed: string;
};
export type User = {
  email: string;
  password: string;
  role: string;
  id?: number;
};
