import { DiscountService } from "api/services/discount.service";
import { atom, selector } from "recoil";
import { Discount } from "types/discount";
import { Order } from "types/order";
import { Product } from "types/product";

export interface OrderDetailState extends Order {
  products: Product[];
}

export const discountsState = selector<Discount[]>({
  key: "discountsState",
  get: async () => (await DiscountService.getAll()) as Discount[],
});

export const selectedDiscountState = atom<Discount | Omit<Discount, "id">>({
  key: "selectedDiscountState",
  default: {} as Discount,
});

export const conditionsTypeState = selector<string[]>({
  key: "conditionsTypeState",
  get: async () => await DiscountService.getConditionsType(),
});

export const selectedOrderState = atom<OrderDetailState>({
  key: "selectedOrderState",
  default: {} as OrderDetailState,
});
