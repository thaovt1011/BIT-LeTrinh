export type SelectedOptions = Record<string, string | string[]>;

export type CreateOrderRequest = {
  id: string;
  customer_id: string;
  shipping_address: string;
  total_amount: number;
  shipping_fee?: number;
  total_products: number;
  note?: string;
  payment_status?: string;
  products: {
    product_id: number;
    quantity: number;
    options?: SelectedOptions;
  }[];
  discounts?: {
    id: number;
  }[];
  discount_value?: number;
  status?: string;
};
