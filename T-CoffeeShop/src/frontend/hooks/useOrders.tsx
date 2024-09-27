import { OrderService } from "api/services/order.service";
import { modalVisibleState } from "components/csmodal";
import {
  SetterOrUpdater,
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import { keywordState, ordersState } from "state";
import { Order } from "types/order";

export const useOrders = () => {
  const setKeyword = useSetRecoilState(keywordState);
  const refreshOrders = useRecoilRefresher_UNSTABLE(ordersState);
  const [modalVisible, setModalVisible] = useRecoilState(modalVisibleState);

  const deleteOrder = (id: string) => {
    OrderService.delete(id)
      .then(() => {
        refreshOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateOrder = (
    updateOrder: Order,
    modalVisible?: SetterOrUpdater<boolean>
  ) => {
    OrderService.update(updateOrder)
      .then(() => {
        if (modalVisible) {
          modalVisible(false);
        }
        refreshOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateOrderStatus = (id: string, status: string) => {
    OrderService.updateOrderStatus(id, status)
      .then(() => {
        if (modalVisible) {
          setModalVisible(false);
        }
        refreshOrders();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchOrderByKeyword = (keyword: string) => {
    setKeyword(keyword);
  };

  return {
    deleteOrder,
    updateOrder,
    searchOrderByKeyword,
    updateOrderStatus,
  };
};

export default useOrders;
