import React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { getMonthRevenueTotalState, getYearReveneState } from "../state";
import { getMonthName } from "utils/date";

export const CSLineChart = () => {
  const getMonthRevenue = useRecoilValueLoadable(getMonthRevenueTotalState);
  const getRevenue = useRecoilValue(getYearReveneState);

  console.log(getRevenue, "Dashboard");

  let { state, contents } = getMonthRevenue;
  var monthRevenue = [];
  if (state === "hasValue") {
    monthRevenue = contents.map((e) => {
      return {
        name: `${getMonthName(e.month)}`,
        uv: e.totalRevenue,
      };
    });
  }

  console.log(contents);

  return (
    <AreaChart
      width={monthRevenue.length * 100}
      height={250}
      data={monthRevenue}
      margin={{ top: 10, right: 30, left: 35, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />

      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip
        formatter={(value, name, props) => value.toLocaleString() + " đ"}
      />
      <Area
        type="monotone"
        dataKey="uv"
        name="Revenue"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
    </AreaChart>
  );
};
