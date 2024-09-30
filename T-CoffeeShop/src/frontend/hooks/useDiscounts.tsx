import { DiscountService } from "api/services/discount.service";
import { modalVisibleState } from "components/csmodal";
import { discountsState } from "pages/admin/discount/state";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useSetRecoilState,
} from "recoil";

export const useDiscounts = () => {
  const refresh = useRecoilRefresher_UNSTABLE(discountsState);
  const [modalVisible, setModalVisible] = useRecoilState(modalVisibleState);

  const add = async (data) => {
    await DiscountService.create(data)
      .then(() => {
        if (modalVisible) {
          setModalVisible(false);
          setTimeout(() => {
            refresh();
          }, 320);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const update = async (data) => {
    await DiscountService.update(data)
      .then(() => {
        if (modalVisible) {
          setModalVisible(false);
          setTimeout(() => {
            refresh();
          }, 320);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleted = async (id) => {
    await DiscountService.delete(id)
      .then(() => {
        if (modalVisible) {
          setModalVisible(false);
          setTimeout(() => {
            refresh();
          }, 320);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { add, update, deleted };
};
