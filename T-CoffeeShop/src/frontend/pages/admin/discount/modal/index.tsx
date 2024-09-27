import { CSModal } from "components/csmodal";
import React from "react";
import { DetailFormTab } from "./tabs/form";
import { HiClipboardList, HiMenu } from "react-icons/hi";
import { OrderTableTab } from "./tabs/order-table";
import { CSTabs, Tab } from "components/cstabs";

export const tabs: Tab[] = [
  {
    tab: <DetailFormTab />,
    icon: <HiClipboardList size={16} className="inline" />,
    label: "Detail",
  },
  {
    tab: <OrderTableTab />,
    icon: <HiMenu size={16} className="inline" />,
    label: "Order",
  },
];

export const ModalManageDiscount = () => {
  return (
    <CSModal
      zIndex={1200}
      description={(<CSTabs tabs={tabs} />) as unknown as string}
    />
  );
};
