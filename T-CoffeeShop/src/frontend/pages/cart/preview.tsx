import { DisplayPrice } from "components/display/price";
import React, { FC } from "react";
import { useRecoilValue } from "recoil";
import {
  selectedAddressState,
  totalPriceState,
  totalQuantityState,
  userCurrentState,
  sendNotification
} from "state";
import pay from "utils/product";
import { Box, Button, Text } from "zmp-ui";
import { events, EventName } from "zmp-sdk/apis";

import { useNavigate } from "react-router-dom";

export const CartPreview: FC = () => {
  const quantity = useRecoilValue(totalQuantityState);
  const totalPrice = useRecoilValue(totalPriceState);
  const navigate = useNavigate();
  const selectAddress = useRecoilValue(selectedAddressState);
  const userCurrent = useRecoilValue(userCurrentState);

  const payment_methods_NOT_CHECKED = ["BANK", "BANK_SANDBOX", "COD", "COD_SANDBOX"];

  events.on(EventName.PaymentClose, (data) => {
    console.log("Payment Result : ", data);
    const params = data?.path;
    if (params.includes("/result")) {
      navigate("/result", { state: params});
    } else if (payment_methods_NOT_CHECKED.includes(data.method)) {
      navigate("/result", { state: data });
    }
  });

  events.on(EventName.OpenApp, (data) => {
    console.log("Payment Result on open app event : ", data);
    const params = data?.path;
    if (params.includes("/result")) {
      navigate("/result", { state: params});
    } else if (payment_methods_NOT_CHECKED.includes(data.method)) {
      navigate("/result", { state: data });
    }
  });

  return (
    <Box flex className="sticky bottom-0 bg-background p-4 space-x-4">
      <Box
        flex
        flexDirection="column"
        justifyContent="space-between"
        className="min-w-[120px] flex-none"
      >
        <Text className="text-gray" size="xSmall">
          {quantity} sản phẩm
        </Text>
        <Text.Title size="large">
          <DisplayPrice>{totalPrice}</DisplayPrice>
        </Text.Title>
      </Box>
      <Button
        type="highlight"
        disabled={!quantity || !selectAddress || !userCurrent?.phone_number}
        fullWidth
        onClick={async () => {
          try {
            await sendNotification(); // Gọi hàm sendNotification
            // Nếu thành công, gọi hàm pay
            pay(totalPrice);
          } catch (error) {
            // Xử lý khi cấp quyền thất bại
            console.log("Cấp quyền Zalo OA thất bại", error);
            pay(totalPrice);
          }
        }}
      >
        Đặt hàng
      </Button>
    </Box>
  );
};
