export type PaymentForOrder = {
  order_id: string;
  payment_method: string;
  status: string;
  amount: number;
  description: string;
};
