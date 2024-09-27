import React from "react";
import { Box, Header, Page } from "zmp-ui";
import { ModalManageCustomer } from "./modal";
import { CSTable } from "components/cstable";
import { customersState, selectedCustomerState } from "./state";
import { PageWrapper } from "components/page-wrapper";

const rowsTitle = {
  name: {
    title: "Họ tên:",
  },
  phone_number: {
    title: "Số điện thoại:",
  },
};

export const CustomerManagePage = () => {
  return (
    <PageWrapper title={"Quản lý khách hàng"}>
      <Box m={4} className="bg-white rounded-lg">
        <CSTable
          valueRecoilState={customersState}
          setRecoilState={selectedCustomerState}
          rowsTitle={rowsTitle}
          actions
        />
      </Box>
      <ModalManageCustomer />
    </PageWrapper>
  );
};
