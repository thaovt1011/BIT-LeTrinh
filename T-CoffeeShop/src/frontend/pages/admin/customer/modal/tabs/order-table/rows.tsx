import React, { useState } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { Order } from "types/order";
import { displayCustomDate } from "utils/date";
import { LoadingRows } from "./loading-rows";
import { motion } from "framer-motion";
import { OrderDetailTable } from "./order-detail-table";
import { selectedOrderState } from "pages/admin/order/state";
import { useCustomer } from "hooks/useCustomers";
import { selectedCustomerOrderState } from "pages/admin/customer/state";
import { ordersState } from "state";

const dropDownState = atom<string | undefined>({
  key: "dropDownState",
  default: undefined,
});

export const Rows = () => {
  const customerOrder = useRecoilValueLoadable(selectedCustomerOrderState);
  const [dropDown, setDropDown] = useRecoilState(dropDownState);
  const setSelectedOrder = useSetRecoilState(selectedOrderState);
  const { deletedCustomerOrder } = useCustomer();

  const { state, contents } = customerOrder;

  const handleDetailOrder = (val: Order, e) => {
    e.preventDefault;
    setSelectedOrder(val);
    if (val.id !== dropDown) {
      setDropDown(val.id);
      return;
    }
    setDropDown(undefined);
  };

  const handleDeletedOrder = (id: string) => {
    deletedCustomerOrder(id);
  };

  if (state === "hasValue")
    return (
      <>
        {contents.map((val: Order, key) => (
          <tr key={key} className="border-0">
            <td className="px-0">
              <div className="flex justify-center">
                <div className="p-2 space-y-2 border-2 rounded-md w-full">
                  <div className="flex justify-between">
                    <span className="font-bold">Ngày tạo:</span>
                    <span>{displayCustomDate(new Date(val.order_date))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Tổng tiền:</span>
                    <span className="bg-green text-white rounded-lg px-1">
                      {val?.total_amount?.toLocaleString() + " "}đ
                    </span>
                  </div>
                  <div className="divider divider-neutral">Thao Tác</div>
                  <div className="flex *:flex-1 gap-x-5">
                    <button
                      className="btn btn-sm"
                      onClick={(e) => {
                        handleDetailOrder(val, e);
                      }}
                    >
                      Chi Tiết
                    </button>
                    <button
                      className="btn btn-sm btn-outline btn-error"
                      onClick={() => {
                        handleDeletedOrder(val.id);
                      }}
                    >
                      Xóa
                    </button>
                  </div>
                  <motion.div
                    {...((isActived = dropDown === val.id) => {
                      return {
                        className: `rounded-2xl !max-h-60 ${
                          isActived ? "border" : ""
                        }`,
                        initial: {
                          height: 0,
                        },
                        animate: {
                          height: isActived ? "auto" : 0,
                          overflow: isActived ? "auto" : "hidden",
                        },
                      };
                    })()}
                  >
                    <OrderDetailTable />
                  </motion.div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  if (state === "loading") return <LoadingRows />;
  return;
};
