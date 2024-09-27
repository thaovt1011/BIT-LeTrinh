import { atom } from "recoil";
import { Product } from "types/product";

export const selectedFileState = atom<File | undefined>({
  key: "selectedFileState",
  default: undefined,
});

export const selectedProductState = atom<any>({
  key: "selectedProductState",
  default: {} as Product,
});

export const imageUrlState = atom<string | undefined>({
  key: "imageUrlState",
  default: undefined,
});
