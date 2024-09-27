import { selectedOrderDetailState } from "pages/admin/order/state";
import { LoadingRows } from "pages/admin/product/table/loading-rows";
import React from "react";
import { useRecoilValueLoadable } from "recoil";

export const Rows = () => {
  const products = useRecoilValueLoadable(selectedOrderDetailState);
  let { state, contents } = products;

  if (state === "hasValue") {
    return (
      <>
        {contents.map((val, key) => (
          <tr key={key}>
            <td>
              <div className="flex gap-3 items-center">
                <div className="avatar">
                  <div className="mask mask-squircle h-16 w-16">
                    <img
                      src={
                        val?.product.image ||
                        "https://placehold.co/800?text=Image&font=roboto"
                      }
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <div className="font-bold text-lg">{val?.product.name}</div>
                  <div className="opacity-50 flex gap-x-2">
                    <div>{val.product.price.toLocaleString() + " đ"}</div>
                    <div>x</div>
                    <div>{val.quantity}</div>
                  </div>
                  <div className="opacity-50 flex gap-x-2">
                    <div>Size:</div>
                    <div>{val.options.size.label}</div>
                  </div>
                  {val.options.topping &&
                    val.options?.topping.map((t) => (
                      <div className="opacity-50 flex gap-x-2">
                        <div>+ {t.label}:</div>
                        <div>
                          {t.priceChange?.type === "fixed"
                            ? t.priceChange?.amount.toLocaleString() + " đ"
                            : t.priceChange?.percent + "%"}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </>
    );
  }
  if (state === "loading") return <LoadingRows row={8} />;
  return;
};
