import { Divider } from "components/divider";
import React from "react";
import { CartItem } from "types/cart";
import { calcFinalPrice } from "utils/product";
import { Box, Text } from "zmp-ui";

const fields = (price: number, discount: number) => [
  {
    detail: [
      {
        title: "Giá tiền",
        value: price,
      },
      { title: "Giảm giá", value: discount },
    ],
    total: [
      {
        title: "Tổng thanh toán",
        value: price + discount,
      },
      { title: "Thanh toán bằng xxx", value: price + discount },
    ],
  },
];

export const Payment = ({ order }) => {
  return (
    <Box className="space-y-5">
      <Text.Header>Chi tiết thanh toán</Text.Header>
      <Box className="space-y-2">
        {fields(
          order?.detail.reduce(
            (total: number, item: CartItem) =>
              total +
              calcFinalPrice(item.product, item.options) * item.quantity,
            0
          ),
          -30000
        ).map((val) => (
          <>
            {val.detail.map((v) => (
              <Box flex justifyContent="space-between">
                <Text>{v?.title}</Text>
                <Text>{v?.value?.toLocaleString()}</Text>
              </Box>
            ))}
            {val.total.map((v) => (
              <>
                <Divider className="rounded-xl !mx-5 !my-4" size={3} />
                <Box flex justifyContent="space-between">
                  <Text.Header className="text-sm">{v.title}</Text.Header>
                  <Text>{v?.value.toLocaleString()}</Text>
                </Box>
              </>
            ))}
          </>
        ))}
      </Box>
    </Box>
  );
};
