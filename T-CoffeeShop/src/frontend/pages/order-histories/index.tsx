import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import { cartState, orderState } from "state";
import { Cart } from "types/cart";
import { Order } from "types/order";
import { displayCustomDate } from "utils/date";
import { Box, Button, Header, Page, Text, Spinner } from "zmp-ui";

const OrderHistoryPageWrapper = ({ children }) => {
  return (
    <Page className="flex flex-col">
      <Header title="Lịch sử đơn hàng" showBackIcon={true} />
      {children}
    </Page>
  );
};

export const OrderHistoryPage = () => {
  const naigate = useNavigate();
  const setCart = useSetRecoilState(cartState);

  const order = useRecoilValueLoadable(orderState);
  const refreshOrder = useRecoilRefresher_UNSTABLE(orderState);
  let { state, contents } = order;
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      await refreshOrder();
      setLoading(false); 
    };
    fetchData();
  }, []);

  if (state === 'loading') { 
    return (
      <OrderHistoryPageWrapper>
        <Box className="flex-1 flex justify-center items-center pb-24">
          <Spinner /> {}
        </Box>
      </OrderHistoryPageWrapper>
    );
  }

  const handleReOrder = (val: Cart) => {
    setCart(val);
    naigate("/cart");
  };

  if (state === "hasValue") {
    if (!contents.length)
      return (
        <OrderHistoryPageWrapper>
          <Box className="flex-1 flex justify-center items-center pb-24">
            <Text size="large" className="text-gray">
              Không tìm thấy đơn hàng.
            </Text>
          </Box>
        </OrderHistoryPageWrapper>
      );

    return (
      <OrderHistoryPageWrapper>
        <Box flex flexDirection="column" className="gap-y-2" m={4}>
          {[...order.contents]
            .sort((a, b) => Number(b.order_date) - Number(a.order_date))
            .map((val: Order) => (
              <Box p={4} flex className="w-full bg-white rounded-lg">
                <Box
                  flex
                  flexDirection="column"
                  className="gap-2 !flex-1 !justify-between"
                >
                  <Text.Header className="text-sm w-56 truncate overflow-hidden">
                    #{val.id.substring(0, val.id.indexOf("_"))}
                  </Text.Header>
                  <Text>{displayCustomDate(new Date(val.order_date))}</Text>
                </Box>
                <Box
                  flex
                  flexDirection="column"
                  justifyContent="space-between"
                  className="gap-2"
                  alignItems="flex-end"
                >
                  <Text>{val.total_amount.toLocaleString()}đ</Text>
                  {/* <Button
                    size="small"
                    className="rounded-lg"
                    onClick={() => handleReOrder(val.)}
                  >
                    Đặt lại
                  </Button> */}
                </Box>
              </Box>
            ))}
        </Box>
      </OrderHistoryPageWrapper>
    );
  }
  return;
};