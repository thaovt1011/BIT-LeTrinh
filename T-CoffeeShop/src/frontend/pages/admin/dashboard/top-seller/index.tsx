import React from "react";
import { useRecoilValue } from "recoil";
import { getTopSellingProductState } from "../state";

export const TopSeller = () => {
  const topSellingProducts = useRecoilValue(getTopSellingProductState);

  console.log(topSellingProducts, "Top Seller");

  return (
    <div>
      <div className="text-center text-xl font-bold">Top Seller</div>
      <div className="overflow-hidden">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Sold</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {topSellingProducts.map((val, index) => (
              <tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-16 w-16">
                        <img
                          src={val.product?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{val.product?.name}</div>
                      <div className="text-sm opacity-50">
                        {val?.totalRevenue.toLocaleString() + " đ"}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{val?.totalSold}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
