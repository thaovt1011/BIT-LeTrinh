import { CSModal } from "components/csmodal";
import React from "react";
import { ManageFormTab } from "./tabs/form";
import { HiClipboardList, HiMenu } from "react-icons/hi";
import { OrderDetailTableTab } from "./tabs/order-detail-table";
import { CSTabs, Tab } from "components/cstabs";

export const tabs: Tab[] = [
  {
    tab: <ManageFormTab />,
    icon: <HiClipboardList size={16} className="inline" />,
    label: "Manage form",
  },
  {
    tab: <OrderDetailTableTab />,
    icon: <HiMenu size={16} className="inline" />,
    label: "Order detail",
  },
];

export const ModalManageOrder = () => {
  return (
    <CSModal
      zIndex={1200}
      description={(<CSTabs tabs={tabs} />) as unknown as string}
    />
  );
};
