import AxiosClient from "api/axios-client";
import { Variant } from "types/product";

export const VariantService = {
  getAll: async (): Promise<Variant[]> => {
    try {
      return await AxiosClient.get("/variant");
    } catch (error) {
      return [];
    }
  },

  getById: async (id: string): Promise<Variant> => {
    throw new Error("");
  },

  create: async (newProduct: Variant): Promise<Variant> => {
    throw new Error("");
  },

  update: async (updateProduct: Variant): Promise<Variant> => {
    throw new Error("");
  },

  delete: async (id: string): Promise<any> => {
    throw new Error("");
  },
};
