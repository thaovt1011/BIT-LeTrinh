import AxiosClient from "api/axios-client";
import { CreateOrderRequest } from "types/CreateOrderRequest";
import { Order } from "types/order";
import { PaymentForOrder } from "types/payment";
export const OrderService = {
  getAll: async (): Promise<any> => {
    return await AxiosClient.get("/order")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });
  },

  getByUserId: async (id): Promise<any> => {
    return await AxiosClient.get(`/customer/${id}/orders`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return [];
      });
  },

  getById: async (id: string): Promise<Order> => {
    return await AxiosClient.get(`/order/${id}`);
  },

  create: async (data: CreateOrderRequest): Promise<Order> => {
    const invoice = await AxiosClient.post(`/order`, data);
    return (invoice as any).order;
  },

  createPayment: async (data: PaymentForOrder): Promise<PaymentForOrder> => {
    const res = await AxiosClient.post(`/payment`, data);
    return res.data;
  },

  update: async (data: Order): Promise<Order> => {
    return await AxiosClient.put(`/order/${data.id}`, data);
  },

  delete: async (id: string): Promise<any> => {
    return await AxiosClient.delete(`/order/${id}`);
  },

  updateOrderStatus: async (id: string, status: string): Promise<any> => {
    return await AxiosClient.put(`/order/status/${id}`, {
      status: status,
    });
  },
};
