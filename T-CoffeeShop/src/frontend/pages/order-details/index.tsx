import { Divider } from "components/divider";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { orderState } from "state";
import { Order } from "types/order";
import { displayCustomDate } from "utils/date";
import { Box, Header, Page, Text } from "zmp-ui";
import { Preview } from "./preview";
import { Payment } from "./payment";

export const OrderDetailPage = () => {
  let { id } = useParams();
  const [orderSelect, setOrderSelect] = useState<Order | any>();
  const order = useRecoilValue(orderState);

  useEffect(() => {
    setOrderSelect(order.details.find((val) => val.id === id));
  }, []);

  return (
    <Page className="flex flex-col">
      <Header title="Đơn hàng" />
      <Box m={4} p={4} className="bg-white rounded-xl space-y-4">
        <Box className="space-y-2">
          <Text.Header>#{orderSelect?.id}</Text.Header>
          <Text>
            {displayCustomDate(new Date(orderSelect?.createDate as number))}
          </Text>
        </Box>
        <Divider className="rounded-xl" size={3} />
        <Preview order={orderSelect} />
        <Divider className="rounded-xl" size={3} />
        <Payment order={orderSelect} />
      </Box>
    </Page>
  );
};
