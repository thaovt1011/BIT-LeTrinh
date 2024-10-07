import { FormField } from "components/csform/types";

export const formFields: FormField[] = [
  {
    title: "Tên sản phẩm",
    field: "name",
    type: "txt",
    validate: {
      message: "Tên sản phẩm rổng",
    },
  },
  {
    title: "Giá sản phẩm",
    field: "price",
    type: "txt",
    validate: {
      message: "Giá sản phẩm rổng",
    },
  },
  {
    title: "Chi tiết sản phẩm",
    field: "description",
    type: "txtar",
  },
  {
    title: "Tùy chọn",
    field: "variantId",
    type: "mulcbx",
  },
  {
    title: "Chủng loại",
    field: "categoryId",
    type: "mulcbx",
  },
  {
    title: "Gợi ý sản phẩm lên trang chủ",
    field: "isFeatured",
    type: "chk",
  },
];
