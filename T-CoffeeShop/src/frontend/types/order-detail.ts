import { Product } from "./product";

export type OrderDetail = {
  id: string;
  name: string;
  description: Product;
  quantity: number;
  price: number;
};
