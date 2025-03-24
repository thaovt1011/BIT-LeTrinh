import { CustomerService } from "api/services/customer.service";
import { FeedbackService } from "api/services/feedback.service";
import { FeedbackService } from "api/services/feedback.service";
import { OrderService } from "api/services/order.service";
import { atom, selector } from "recoil";
import { Order } from "sequelize";
import { Customer } from "types/customer";
import { Feedback } from "types/feedback";
import { Feedback } from "types/feedback";

export const customersState = selector<Customer[]>({
  key: "customersState",
  get: async () => {
    return (await CustomerService.getAll()) as Customer[];
  },
});

export const selectedCustomerState = atom<Customer>({
  key: "selectedCustomerState",
  default: {} as Customer,
});

export const selectedCustomerOrderState = selector<Order>({
  key: "selectedCustomerOrderState",
  get: async ({ get }) => {
    return await OrderService.getByUserId(get(selectedCustomerState).id);
  },
});

export const selectedCustomerFeedback = selector<Feedback>({
  key: "selectedCustomerFeedback",
  get: async ({ get }) => {
    return await FeedbackService.getFeedbackByUserId(get(selectedCustomerState).id);
  }
});