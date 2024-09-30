import AxiosClient from "api/axios-client";
import { displayInputDate } from "utils/date";

export const DashBoardService = {
  getYearRevenue: async () => {
    return await AxiosClient.get(
      `/dashboard/sales-summary?startDate=${new Date().getFullYear()}-01-01&endDate=${displayInputDate(
        new Date()
      )}`
    );
  },
};
