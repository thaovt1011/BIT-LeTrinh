import React from "react";
import { Rows } from "./row";
import { useRecoilValue } from "recoil";
import { selectedCustomerState } from "pages/admin/customer/state";

export const FeedbackTab = () => {
  const selectedCustomer = useRecoilValue(selectedCustomerState);


  return (
    <>
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Loại Dịch Vụ</th>
              <th className="px-4 py-2 border">Đánh giá</th>
              <th className="px-4 py-2 border">Bình luận</th>
            </tr>
          </thead>
          <tbody>
            <Rows />
          </tbody>
        </table>
      </div>
    </>
  );
};