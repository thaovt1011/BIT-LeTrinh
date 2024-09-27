import AxiosClient from "api/axios-client";
import { Customer } from "types/customer";
import { setStorage } from "zmp-sdk/apis";

export const CustomerService = {
  getAll: async () => {
    try {
      const response = await AxiosClient.get("/customer");
      return response;
    } catch (error) {
      return [];
    }
  },

  getById: async (id: string): Promise<Customer> => {
    try {
      return await AxiosClient.post(`/customer/${id}`);
    } catch (error) {
      return {} as Customer;
    }
  },

  create: async (data: Customer) => {
    try {
      (await AxiosClient.get(`/customer/${data.id}`)
        .then(async (res) => {
          if (res === undefined) {
            return (await AxiosClient.post("/customer", data)) as Customer;
          }
          return {} as Customer;
        })
        .catch((err) => {
          console.log(err);
        })) as Customer;
    } catch (error) {
      console.error("Error creating customer:", error);

      return {} as Customer;
    }
    return;
  },

  update: async (data: Customer): Promise<Customer> => {
    try {
      return await AxiosClient.put(`/customer/${data.id}`, data);
    } catch (error) {
      console.error("Failed to update customer:", error);
      throw error;
    }
  },

  delete: async (id: string): Promise<any> => {
    throw new Error("");
  },

  auth: async (customer_id: string, app_id: string, setAuthenticate) => {
    await AxiosClient.post("/admin/check", { customer_id, app_id })
      .then((res) => {
        setStorage({
          data: {
            authentication: { ...res },
          },
          success: () => {
            setAuthenticate({ ...res });
          },
          fail: (error) => {
            console.error("Error saving cart to storage:", error);
          },
        });
      })
      .catch((err) => console.log(err));
  },
};
