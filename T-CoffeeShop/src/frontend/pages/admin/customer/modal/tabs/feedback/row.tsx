import React from "react";
import { useRecoilValueLoadable } from "recoil";
import { selectedCustomerFeedback } from "pages/admin/customer/state";
import { LoadingRows } from "../order-table/loading-rows";

export const Rows = () => {
    const feedbackLoadable = useRecoilValueLoadable(selectedCustomerFeedback); // Lấy dữ liệu feedback từ selector

    const { state, contents } = feedbackLoadable; // Trạng thái và nội dung của feedback

    if (state === "loading") return <LoadingRows />; // Hiển thị loading nếu đang tải dữ liệu

    if (contents.length > 0) {
      return (
        <>
          {contents.map((feedback, index) => (
            <tr key={index} className="border-t">
              <td className="px-4 py-2 border">
                {feedback.service_type}
              </td>
              <td className="px-4 py-2 border text-center">{feedback.rating}</td>
              <td className="px-4 py-2 border whitespace-nowrap">{feedback.comment}</td>
            </tr>
          ))}
        </>
      );
    }
  
    return (
      <tr>
        <td colSpan={3} className="text-center py-4">
            Khách hàng này chưa đánh giá dịch vụ.
        </td>
      </tr>
    );
  };