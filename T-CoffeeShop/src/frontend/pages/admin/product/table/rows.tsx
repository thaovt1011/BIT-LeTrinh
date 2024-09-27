import React from "react";
import { useRecoilValueLoadable, useSetRecoilState } from "recoil";
import { productsState, resultState } from "state";
import { LoadingRows } from "./loading-rows";
import useProducts from "hooks/useProducts";
import { modalVisibleState } from "components/csmodal";
import { Product } from "types/product";
import { selectedProductState } from "../state";

export const Rows = () => {
  const products = useRecoilValueLoadable(productsState);
  const searchResult = useRecoilValueLoadable(resultState);
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const setSelectedProduct = useSetRecoilState(selectedProductState);
  const { deleteProduct } = useProducts();
  let { state, contents } = products;

  const handleEditProduct = (val: Product) => {
    setSelectedProduct(val);

    setModalVisible(true);
  };

  const handleDeletedProduct = (id) => {
    deleteProduct(id);
  };

  if (state === "hasValue")
    return (
      <>
        {(searchResult.contents.length > 0
          ? searchResult.contents
          : contents
        ).map((val, key) => (
          <tr key={key}>
            <td>
              <div className="flex gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle h-20 w-20">
                    <img
                      src={
                        val.image ||
                        "https://placehold.co/800?text=Image&font=roboto"
                      }
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div className="py-2">
                  <div className="font-bold text-md">{val.name}</div>
                  <div className="opacity-50">
                    {val.price?.toLocaleString() + " đ"}
                  </div>
                </div>
              </div>
            </td>
            <td className="flex flex-col gap-2">
              <button
                className="btn"
                onClick={() => {
                  handleEditProduct(val);
                }}
              >
                Edit
              </button>
              <button
                className="btn"
                onClick={() => {
                  handleDeletedProduct(val.id);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  if (state === "loading") return <LoadingRows row={8} />;
  return;
};
