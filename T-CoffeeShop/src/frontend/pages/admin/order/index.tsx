import React from "react";
import { Box, Header, Page } from "zmp-ui";
import { ModalManageOrder } from "./modal";
import { CSTable } from "components/cstable";
import { selectedOrderState } from "./state";
import { ordersState } from "state";
import useOrders from "hooks/useOrders";
import { PageWrapper } from "components/page-wrapper";
import { useRecoilRefresher_UNSTABLE } from "recoil";

import { CSModal } from "components/csmodal";
import { CSTabs, Tab } from "components/cstabs";
import { HiClipboardList, HiMenu } from "react-icons/hi";
import { Order } from "types/order";

// export const tabs: Tab[] = [
//   {
//     tab: <ManageFormTab />,
//     icon: <HiClipboardList size={16} className="inline" />,
//     label: "Manage form",
//   },
//   {
//     tab: <OrderDetailTableTab />,
//     icon: <HiMenu size={16} className="inline" />,
//     label: "Order detail",
//   },
// ];

const rowsTitle = {
  order_date: {
    title: "Ngày tạo:",
    type: "date",
  },
  total_amount: {
    title: "Tổng tiền:",
    type: "money",
  },
  status: {
    title: "Trạng thái:",
    type: "status",
  },
};

export const OrderManagePage = () => {
  const { deleteOrder } = useOrders();

  const tabs: Tab[] = [
    {
      tab: (
        <CSTable
          rowsTitle={rowsTitle}
          setRecoilState={selectedOrderState}
          valueRecoilState={ordersState}
          actions={{
            deleted: (val) => {
              deleteOrder(val);
            },
          }}
          filterBy={(order: Order) =>
            order.payment?.status === "PENDING" &&
            order.payment?.payment_method !== "ZALOPAY_SANDBOX"
          }
        />
      ),
      icon: <HiClipboardList size={16} className="inline" />,
      label: "Chờ Xử Lý",
    },
    {
      tab: (
        <CSTable
          rowsTitle={rowsTitle}
          setRecoilState={selectedOrderState}
          valueRecoilState={ordersState}
          actions={{
            deleted: (val) => {
              deleteOrder(val);
            },
          }}
          filterBy={(order: Order) => order.payment?.status === "SUCCESS"}
        />
      ),
      icon: <HiMenu size={16} className="inline" />,
      label: "Thành Công",
    },
  ];

  return (
    <PageWrapper title={"Quản lý đơn hàng"}>
      <Box m={4} className="bg-white rounded-lg">
        <CSTabs tabs={tabs} layoutId="order" />
      </Box>
      <ModalManageOrder />
    </PageWrapper>
  );
};
