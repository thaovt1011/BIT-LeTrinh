import React from "react";
import { Cart, CartItem } from "types/cart";
import { Order } from "types/order";
import { displayCustomDate } from "utils/date";
import { Box, Text } from "zmp-ui";

interface OrderItem extends Order {
  shippingDate: number;
  detail: CartItem[];
}

type Props = {
  order: OrderItem;
};



export const Preview = ({ order }: Props) => {
  return (
    <Box className="space-y-5">
      <Text.Header>Chi tiết đơn hàng</Text.Header>
      <Box flex justifyContent="space-between">
        <Text>Thời gian nhận </Text>
        <Text>
          {displayCustomDate(new Date(order?.shippingDate as number))}
        </Text>
      </Box>
      <Box className="space-y-2 pe-3 !max-h-52 overflow-auto">
        {order?.detail?.map((val: CartItem) => (
          <Box flex className="gap-x-2 overflow-hidden">
            <img
              src={val.product.image}
              className="h-20 w-20 object-cover rounded-lg"
              alt=""
            />
            <Box
              flex
              flexDirection="column"
              justifyContent="space-between"
              className="flex-1 !max-h-20 overflow-auto"
            >
              <Text.Header className="overflow-hidden !w-full">
                {val.product.name}
              </Text.Header>
              <Box flex className="text-sm gap-x-5">
                <Text>Số lượng:</Text>
                <Text>{val.quantity}</Text>
              </Box>
              <Text className="text-sm">
                Giá tiền: {val.product.price?.toLocaleString() + " đ"}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
