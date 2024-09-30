import { DiscountService } from "api/services/discount.service";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  discountState,
  selectedDiscountToOrderState,
  totalPriceState,
  totalQuantityState,
  userCurrentState,
} from "state";
import { Discount } from "types/discount";
import { Box, Page, Sheet, Text } from "zmp-ui";

export const DiscountPicker: any = () => {
  const userCurrent = useRecoilValue(userCurrentState);
  const quantity = useRecoilValue(totalQuantityState);
  const totalPrice = useRecoilValue(totalPriceState);
  const [discount, setDiscount] = useRecoilState<Discount[]>(discountState);
  const [selectedDiscount, setSelectedDiscount] = useRecoilState<Discount[]>(
    selectedDiscountToOrderState
  );
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  useEffect(() => {
    const getDiscounts = async () => {
      const discounts = await DiscountService.getApplicableDiscount({
        customer_id: userCurrent?.id,
        total_quantity: quantity,
        total_amount: totalPrice,
      });
      setDiscount(discounts);
    };
    getDiscounts();
  }, [actionSheetVisible, totalPrice]);

  return (
    <Box>
      <Text.Title
        size="small"
        onClick={async () => {
          setActionSheetVisible(true);
        }}
        className="border-none bg-transparent text-sm text-primary font-medium text-md m-0 p-0 h-auto"
      >
        {selectedDiscount.length > 0
          ? selectedDiscount
              .map((d) => {
                return `${d.code} - ${d.value} ${
                  d.type === "value" ? "đ" : "%"
                }`;
              })
              .join(", ")
          : "Chọn mã giảm giá"}
      </Text.Title>

      <Sheet
        mask
        visible={actionSheetVisible}
        title="Chọn mã giảm giá"
        onClose={() => setActionSheetVisible(false)}
        className="flex flex-col z-50"
        swipeToClose
      >
        <Box className="p-4 overflow-auto">
          <Box className="items-center justify-between border rounded-lg p-2 mb-2 relative">
            <Text.Title>Mã bạn có thể dùng ({discount.length})</Text.Title>
            <Box
              className="btn btn-sm btn-warning text-white absolute top-2 right-5"
              onClick={() => {
                setSelectedDiscount([]);
                setActionSheetVisible(false);
              }}
            >
              Không dùng
            </Box>
            {discount.map((e: Discount, k) => (
              <Box
                key={k}
                className="flex flex-col m-3 rounded-lg border border-opacity-50 "
                onClick={() => {
                  if (selectedDiscount.includes(e)) {
                    setSelectedDiscount([]);
                  }
                  setSelectedDiscount([e]);
                  setActionSheetVisible(false);
                }}
              >
                <label className="flex items-center p-3 m-3 rounded-lg border border-opacity-50 ">
                  <input
                    type="radio"
                    name="discounts"
                    className="radio-primary me-2"
                  />
                  {e.code} - Giảm {e.value?.toLocaleString()}{" "}
                  {e.type === "value" ? "đ" : "%"}
                </label>
                <label className="flex flex-col p-3 m-3 rounded-lg border border-opacity-50 ">
                  - Ngày hết hạn:{" "}
                  {new Date(e.end_date).getFullYear() -
                    new Date().getFullYear() >
                  10
                    ? "Không hết hạn"
                    : new Date(e.end_date).toLocaleDateString("vi-VN")}
                  {e.description && (
                    <Box className="text-gray-500 mt-2">- {e.description}</Box>
                  )}
                </label>
              </Box>
            ))}
          </Box>
        </Box>
      </Sheet>
    </Box>
  );
};
