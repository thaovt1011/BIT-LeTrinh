import React from "react";
import { Discount } from "types/discount";
import { displayCustomDate } from "utils/date";
import { discountsState, selectedDiscountState } from "../state";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { LoadingRows } from "./loading-rows";
import { modalVisibleState } from "components/csmodal";

export const Rows = () => {
  const discounts = useRecoilValueLoadable(discountsState);
  const setSelectedDiscount = useSetRecoilState(selectedDiscountState);
  const setModalVisible = useSetRecoilState(modalVisibleState);
  let { state, contents } = discounts;

  const handleDetailCustomer = (val: Discount) => {
    setSelectedDiscount(val);
    setModalVisible(true);
  };

  if (state === "loading") return <LoadingRows />;
  if (state === "hasValue")
    return (
      <>
        {contents.map((val: Discount, key) => (
          <tr key={key} className="border-0">
            <td>
              <div className="flex justify-center">
                <div className="p-2 space-y-2 border-2 rounded-md w-full">
                  <div className="flex justify-between">
                    <span className="font-bold">Mã:</span>
                    <span className="bg-black text-white rounded-lg px-1">
                      #{val.code}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="font-bold">Ngày áp dụng:</span>
                    <span>{displayCustomDate(new Date(val.start_date))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold">Ngày hết hạn:</span>
                    <span>{displayCustomDate(new Date(val.end_date))}</span>
                  </div>
                  <div className="divider divider-neutral">Thao tác</div>
                  <div className="flex *:flex-1 gap-x-5">
                    <button
                      className="btn btn-sm"
                      onClick={() => handleDetailCustomer(val)}
                    >
                      Chi tiết
                    </button>
                    <button className="btn btn-sm btn-outline btn-error">
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  return;
};
