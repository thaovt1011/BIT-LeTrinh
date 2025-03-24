import React from "react";
import { Box, Header, Page } from "zmp-ui";
import { PageWrapper } from "components/page-wrapper";
import { CSLineChart } from "./line-chart";
import { useRecoilValueLoadable } from "recoil";
import {
  getYearDiscountAmountTotalState,
  getYearDiscountsAppliedTotalState,
  getYearOrderTotalState,
  getYearReveneTotalState,
} from "./state";
import { TopSeller } from "./top-seller";
import { displayInputDate } from "utils/date";
import { LoadingRows } from "components/cstable/loading-rows";

export const DashBoardPage = () => {
  const yearRevenueTotal = useRecoilValueLoadable(getYearReveneTotalState);
  const yearOrderTotal = useRecoilValueLoadable(getYearOrderTotalState);
  const yearDiscountsAppliedTotal = useRecoilValueLoadable(
    getYearDiscountsAppliedTotalState
  );
  const yearDiscountAmountTotal = useRecoilValueLoadable(
    getYearDiscountAmountTotalState
  );

  let { state, contents } = yearDiscountAmountTotal;
  if (state === "hasValue")
    return (
      <PageWrapper title={"Dashboard"}>
        <Box m={4} className="bg-white rounded-lg p-4">
          <span className="font-bold text-xl">Doanh thu</span>
          <Box m={4} className="bg-white rounded-lg overflow-auto">
            <CSLineChart />
          </Box>
          <Box className="border pb-2 rounded-lg">
            <div className="text-center py-2">
              <span className="text-xl font-bold">Total</span>
              <br />
              <span>
                (
                {`${new Date().getFullYear()}-01-01 to ${displayInputDate(
                  new Date()
                )}`}
                )
              </span>
            </div>
            <div className="flex gap-2 justify-center flex-wrap">
              <div className="flex flex-col items-center border rounded-lg w-36">
                <div>Revenue</div>
                <span className="font-bold">
                  {yearRevenueTotal.contents.toLocaleString() + " đ"}
                </span>
              </div>
              <div className="flex flex-col items-center border rounded-lg w-36">
                <div>Order</div>
                <span className="font-bold">{yearOrderTotal.contents}</span>
              </div>
              <div className="flex flex-col items-center border rounded-lg w-36">
                <div>Discount Applied</div>
                <span className="font-bold">
                  {yearDiscountsAppliedTotal.contents}
                </span>
              </div>
              <div className="flex flex-col items-center border rounded-lg w-36">
                <div>Discount Amount</div>
                <span className="font-bold">
                  {yearDiscountAmountTotal.contents.toLocaleString() + " đ"}
                </span>
              </div>
            </div>
          </Box>
          <Box className="p-4">
            <TopSeller />
          </Box>
        </Box>
      </PageWrapper>
    );
  return (
    <PageWrapper title={"Dashboard"}>
      <Box
        className="bg-white rounded-lg p-4 justify-center items-center flex w-full h-full"
      >
        <span className="loading loading-lg loading-bars"></span>
      </Box>
    </PageWrapper>
  );
};
