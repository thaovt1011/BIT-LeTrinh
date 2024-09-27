import { CartItem } from "types/cart";
import AxiosClient from "api/axios-client";
import { OrderDetail } from "types/order-detail";

export const OrderDetailService = {
  getAll: async (): Promise<CartItem> => {
    throw new Error("");
  },

  getById: async (id: string): Promise<CartItem> => {
    throw new Error("");
  },
  getByOrderId: async (id: string): Promise<any> => {
    return await AxiosClient.get(`/order/${id}/detail`)
      .then((res) => res)
      .catch((err) => {
        console.log(err);
        return [] as OrderDetail[];
      });
  },

  create: async (data: CartItem): Promise<CartItem> => {
    throw new Error("");
  },

  update: async (data: CartItem): Promise<CartItem> => {
    throw new Error("");
  },

  delete: async (id: string): Promise<any> => {
    throw new Error("");
  },
};
