import React, { useEffect, useRef, useState } from "react";
import { Box, Header, Page } from "zmp-ui";
import { TableProductManage } from "./table";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ModalManageProduct } from "./modal";
import { imageUrlState, selectedFileState } from "./state";
import { PageWrapper } from "components/page-wrapper";

const ProductManagePage = () => {
  const inputUploadRef = useRef<HTMLInputElement>();
  const setImageUrl = useSetRecoilState(imageUrlState);
  const selectedFile = useRecoilValue(selectedFileState);

  const loadImage = (file: any) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () =>
        typeof reader.result === "string"
          ? resolve(reader.result)
          : reject(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    if (selectedFile) {
      loadImage(selectedFile).then(setImageUrl);
    }
  }, [selectedFile]);

  return (
    <PageWrapper title={"Quản lý sản phẩm"}>
      <Box m={4} className="bg-white rounded-lg">
        <TableProductManage />
      </Box>
      <ModalManageProduct />
    </PageWrapper>
  );
};

export default ProductManagePage;
