import { OrderService } from "api/services/order.service";
import {
  selectedCustomerOrderState,
  selectedCustomerState,
} from "pages/admin/customer/state";
import { useRecoilRefresher_UNSTABLE } from "recoil";

export const useCustomer = () => {
  const refreshCustomer = useRecoilRefresher_UNSTABLE(selectedCustomerState);

  const deletedCustomerOrder = (id: string) => {
    refreshCustomer();
  };
  return { deletedCustomerOrder };
};
