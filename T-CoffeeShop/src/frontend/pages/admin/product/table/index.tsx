import React from "react";
import { Product } from "types/product";
import { Rows } from "./rows";
import { TableHeader } from "./header";
import { CSTable } from "components/cstable";
import { selectedFileState, selectedProductState } from "../state";
import { productsState } from "state";
import { useRecoilRefresher_UNSTABLE, useSetRecoilState } from "recoil";
import { modalVisibleState } from "components/csmodal";
import useProducts from "hooks/useProducts";

export const TableProductManage = () => {
  const setSelectedFile = useSetRecoilState(selectedFileState);
  const setSelectedProduct = useSetRecoilState(selectedProductState);
  const setModalVisible = useSetRecoilState(modalVisibleState);
  const { deleteProduct } = useProducts();

  const handleEditProduct = (val: Product) => {
    setSelectedProduct(val);
    setModalVisible(true);
  };

  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
  };

  return (
    <CSTable
      setRecoilState={selectedProductState}
      valueRecoilState={productsState}
      filter="name"
      actions={{
        created: () => {
          setSelectedProduct({});
          setSelectedFile(undefined);
          setModalVisible(true);
          // refresh();
        },
      }}
    >
      {(val) => (
        <>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-3">
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
            <div className="flex flex-col gap-y-2">
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
                  handleDeleteProduct(val.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </CSTable>
  );
  // if (products.state == "hasValue")
  //   return (
  //     <TableWrapper>
  //       <Rows
  //         data={isEmpty(result.contents) ? products.contents : result.contents}
  //         actions={{
  //           handleEditProduct: (val: Product) => {
  //             setSelectedProduct(val);
  //             setModalVisible(true);
  //           },
  //           handleDeletedProduct: (id) => {
  //             deleteProduct(id);
  //           },
  //         }}
  //       />
  //     </TableWrapper>
  //   );
  // else {
  //   return <div>Error please try again late...</div>;
  // }
};
