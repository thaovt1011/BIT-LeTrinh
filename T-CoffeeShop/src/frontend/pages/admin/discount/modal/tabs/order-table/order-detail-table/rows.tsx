import React from "react";
import {
  selectedOrderDetailState,
  selectedOrderState,
} from "pages/admin/order/state";
import { LoadingRows } from "pages/admin/product/table/loading-rows";
import { useRecoilValueLoadable } from "recoil";

export const Rows = () => {
  const orders = useRecoilValueLoadable(selectedOrderState);
  let { state, contents } = orders;
  if (state === "hasValue")
    return (
      <>
        {contents?.products?.map((val, key) => {
          return (
            <tr key={key}>
              <td>
                <div className="flex gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-24 w-24">
                      <img
                        src={
                          val?.image ||
                          "https://placehold.co/800?text=Image&font=roboto"
                        }
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div className="py-2">
                    <div className="font-bold text-lg">{val?.name}</div>
                    <div className="opacity-50 flex gap-x-2">
                      <div>{val?.price?.toLocaleString() + " đ"}</div>
                      <div>|</div>
                      <div>{val?.OrderProduct?.quantity}</div>
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          );
        })}
      </>
    );
  if (state === "loading") return <LoadingRows row={8} />;
  return;
};
