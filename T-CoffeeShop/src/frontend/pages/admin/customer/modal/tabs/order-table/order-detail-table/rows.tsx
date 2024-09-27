import React from "react";
import { selectedOrderDetailState } from "pages/admin/order/state";
import { LoadingRows } from "pages/admin/product/table/loading-rows";
import { useRecoilValueLoadable } from "recoil";

export const Rows = () => {
  const products = useRecoilValueLoadable(selectedOrderDetailState);
  let { state, contents } = products;

  if (state === "hasValue")
    return (
      <>
        {contents.map((val, key) => (
          <tr key={key}>
            <td className="px-2">
              <div className="flex gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-20 w-20">
                    <img
                      src={
                        val.product.image ||
                        "https://placehold.co/800?text=Image&font=roboto"
                      }
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <div className="font-bold text-xs">{val.product.name}</div>
                  <div className="opacity-50 flex gap-x-2 text-xs">
                    <div>{val.product.price?.toLocaleString() + " đ"}</div>
                    <div>|</div>
                    <div>{val.quantity}</div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  if (state === "loading") return <LoadingRows row={8} />;
  return;
};
