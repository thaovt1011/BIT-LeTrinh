import AxiosClient from "api/axios-client";
import { Discount } from "types/discount";

export const DiscountService = {
  getAll: async () => {
    try {
      const response = await AxiosClient.get("/discount");
      return response;
    } catch (error) {
      return [];
    }
  },

  getById: async (id: string): Promise<Discount> => {
    try {
      return await AxiosClient.get(`/discount/${id}`);
    } catch (error) {
      return {} as Discount;
    }
  },

  getApplicableDiscount: async (data): Promise<Discount[]> => {
    try {
      return await AxiosClient.post(`/discount/applicable`, data);
    } catch (error) {
      return [] as Discount[];
    }
  },

  getConditionsType: async (): Promise<string[]> => {
    try {
      return await AxiosClient.get(`/discount/conditions-type`);
    } catch (error) {
      return [] as string[];
    }
  },

  create: async (data: Discount): Promise<Discount> => {
    try {
      return await AxiosClient.post("/discount", data);
    } catch (error) {
      return {} as Discount;
    }
  },

  update: async (data: Discount): Promise<Discount> => {
    try {
      return await AxiosClient.put(`/discount/${data.id}`, data);
    } catch (error) {
      return {} as Discount;
    }
  },

  delete: async (id: string): Promise<any> => {
    try {
      return await AxiosClient.delete(`/discount/${id}`);
    } catch (error) {
      return {} as Discount;
    }
  },
};
