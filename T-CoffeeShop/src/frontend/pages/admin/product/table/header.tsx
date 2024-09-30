import useProducts from "hooks/useProducts";
import React, { useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { selectedFileState, selectedProductState } from "../state";
import { debounce } from "lodash";
import { modalVisibleState } from "components/csmodal";

export const TableHeader = () => {
  const { searchProductByKeyword } = useProducts();
  const setSelectedFile = useSetRecoilState(selectedFileState);
  const setSelectedProduct = useSetRecoilState(selectedProductState);
  const setModalVisible = useSetRecoilState(modalVisibleState);

  const handleCreatedProduct = () => {
    setSelectedProduct({});
    setSelectedFile(undefined);
    setModalVisible(true);
  };

  const handleSearchProduct = useCallback(
    debounce((keyword) => {
      searchProductByKeyword(keyword);
    }, 500),
    []
  );

  return (
    <div className="p-4 flex gap-x-2">
      <label className="input input-bordered input-sm flex flex-1 items-center">
        <input
          type="text"
          className="grow "
          placeholder="Search"
          onChange={(e) => handleSearchProduct(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <button onClick={() => handleCreatedProduct()} className="btn btn-sm">
        Create
      </button>
    </div>
  );
};
