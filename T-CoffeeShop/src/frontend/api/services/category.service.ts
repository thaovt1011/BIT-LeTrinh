import AxiosClient from "api/axios-client";
import { Category } from "types/category";

export const CategoryService = {
  getAll: async (): Promise<any> => {
    try {
      const categories = await AxiosClient.get("/category");
      
      return categories;
    } catch (error) {
      console.log("Get all categories error: ", error);
      return [];
    }
  },

  getById: async (id: string): Promise<Category> => {
    throw new Error("");
  },

  create: async (data: Category): Promise<Category> => {
    throw new Error("");
  },

  update: async (data: Category): Promise<Category> => {
    throw new Error("");
  },

  delete: async (id: string): Promise<any> => {
    throw new Error("");
  },
};
