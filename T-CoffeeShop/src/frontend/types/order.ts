import { Customer } from "./customer";
import { Discount } from "./discount";
import { OrderDetail } from "./order-detail";

interface Payment {
  amount: number;
  description: string;
  id: number;
  order_id: string;
  payment_method: string;
  status: string;
}

export type Order = {
  customer: Customer;
  id: string;
  order_date: string;
  shipping_address: string;
  shipping_fee: number;
  total_amount: number;
  details: OrderDetail[];
  discounts: Discount[];
  note: string;
  payment?: Payment;
};
