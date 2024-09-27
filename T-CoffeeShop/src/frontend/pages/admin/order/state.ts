import { atom, selector } from "recoil";
import { Order } from "types/order";
import { OrderDetail } from "types/order-detail";
import { OrderDetailService } from "api/services/order-detail.service";

export const selectedOrderState = atom<Order>({
  key: "selectedOrderState",
  default: {} as Order,
});

export const selectedOrderDetailState = selector<OrderDetail>({
  key: "selectedOrderDetailState",
  get: async ({ get }) => {
    const id = get(selectedOrderState).id;
    return await OrderDetailService.getByOrderId(id);
  },
});
