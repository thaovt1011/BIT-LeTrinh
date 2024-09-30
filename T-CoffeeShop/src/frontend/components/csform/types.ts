import { ReactElement } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

export type FormControllerProps = {
  title: string;
  tInput?: string;
  register: UseFormRegisterReturn<any>;
  select_register?: UseFormRegisterReturn<any> | undefined;
  errors: FieldError | undefined;
  arrMulCbx?: [] | undefined;
  arrSelectBx?: [] | undefined;
  disable?: boolean;
  selectType?: any;
};

export type FormField = {
  title: string;
  field: string;
  type: string;
  select_field?: string;
  validate?: { number?: boolean; message: string };
};

export type CSFormProps = {
  onCSSubmit?: Function | Boolean;
  fields: FormField[];
  initialValue: object;
  btnSubmit?: ReactElement;
  formDataPattern?: Function;
  arrMulCbxs?: object | undefined;
  arrSelectBxs?: object | undefined;
  children?: ReactElement;
};
