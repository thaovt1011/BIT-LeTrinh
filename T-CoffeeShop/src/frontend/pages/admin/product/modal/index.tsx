import React from "react";
import { ManageProductForm } from "./form";
import { Product } from "types/product";
import { imageUrlState, selectedProductState } from "../state";
import { useRecoilState, useRecoilValue } from "recoil";
import { CSModal } from "components/csmodal";

export const ModalManageProduct = () => {
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);
  const selectedProduct = useRecoilValue(selectedProductState);
  return (
    <CSModal
      afterClose={() => {
        setImageUrl(undefined);
        (document.querySelector<HTMLInputElement>("#uploadProductImage")!
          .value as any) = null;
      }}
      title={
        (
          <img
            src={
              imageUrl ||
              (selectedProduct as Product).image ||
              "https://placehold.co/800?text=Image&font=roboto"
            }
            onClick={() =>
              document
                .querySelector<HTMLInputElement>("#uploadProductImage")
                ?.click()
            }
            alt=""
            className="w-full h-64 object-cover rounded-lg"
          />
        ) as unknown as string
      }
      zIndex={1200}
      description={(<ManageProductForm />) as unknown as string}
    />
  );
};
