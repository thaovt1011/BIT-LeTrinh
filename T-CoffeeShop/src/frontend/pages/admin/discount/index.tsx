import React from "react";
import { Box, Header, Page } from "zmp-ui";
import { TableManageCoupon } from "./table";
import { ModalManageDiscount } from "./modal";
import { CSTable } from "components/cstable";
import { discountsState, selectedDiscountState } from "./state";
import { PageWrapper } from "components/page-wrapper";
import { useDiscounts } from "hooks/useDiscounts";
import { useSetRecoilState } from "recoil";
import { modalVisibleState } from "components/csmodal";
import { Discount } from "types/discount";

const rowsTitle = {
  code: {
    title: "Mã:",
    type: "",
  },
  start_date: {
    title: "Ngày áp dụng:",
    type: "date",
  },
  end_date: {
    title: "Ngày hết hạn:",
    type: "date",
  },
};

export const DiscountManagePage = () => {
  const { deleted } = useDiscounts();
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const selectedDiscount = useSetRecoilState(selectedDiscountState);

  return (
    <PageWrapper title={"Quản lý khuyến mãi"}>
      <Box m={4} className="bg-white rounded-lg">
        <CSTable
          rowsTitle={rowsTitle}
          setRecoilState={selectedDiscountState}
          valueRecoilState={discountsState}
          filter="code"
          actions={{
            created: () => {
              selectedDiscount({
                code: "",
                conditions: [],
                description: "",
                end_date: "",
                start_date: "",
                type: "",
                value: null,
              });
              setModalVisible(true);
            },
            deleted: (id) => {
              deleted(id);
            },
          }}
        />
      </Box>
      <ModalManageDiscount />
    </PageWrapper>
  );
};
