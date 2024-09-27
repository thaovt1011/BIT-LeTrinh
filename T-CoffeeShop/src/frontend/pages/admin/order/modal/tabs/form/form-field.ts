import { FormField } from "components/csform/types";

export const formFields: FormField[] = [
  {
    title: "Khách hàng",
    field: "customer.name",
    type: "txt",
  },
  {
    title: "Tổng tiền",
    field: "total_amount",
    type: "txt",
  },
  {
    title: "Ngày tạo",
    field: "order_date",
    type: "txt",
  },
  {
    title: "Địa chỉ",
    field: "shipping_address",
    type: "txtar",
  },
  {
    title: "Ghi chú",
    field: "note",
    type: "txtar",
  },
];
