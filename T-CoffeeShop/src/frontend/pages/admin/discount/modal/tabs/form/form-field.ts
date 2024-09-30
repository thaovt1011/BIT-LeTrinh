import { FormField } from "components/csform/types";

export const formFields: FormField[] = [
  {
    title: "Tên",
    field: "code",
    type: "txt",
  },
  {
    title: "Trị giá",
    field: "value",
    select_field: "type",
    type: "txtselect",
  },
  {
    title: "Ngày áp dụng",
    field: "start_date",
    type: "date",
  },
  {
    title: "Ngày hết hạn",
    field: "end_date",
    type: "date",
  },
  {
    title: "Mô tả",
    field: "description",
    type: "txtar",
  },
  {
    title: "Giá trị áp dụng",
    field: "MIN_VALUE",
    type: "txt",
  },
  {
    title: "Mức giảm tối đa",
    field: "MAX_DISCOUNT_VALUE",
    type: "cttxt",
  },
  {
    title: "Lần đặt hàng đầu tiên",
    field: "FIRST_ORDER",
    type: "chk",
  },
];
