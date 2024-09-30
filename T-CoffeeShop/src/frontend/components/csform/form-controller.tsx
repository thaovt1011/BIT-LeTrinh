import React, { ReactNode, useCallback, useState } from "react";
import { HiExclamation } from "react-icons/hi";
import { FormControllerProps } from "./types";
import { atom, useRecoilState, useRecoilValue } from "recoil";

export const selectTypeState = atom<string>({
  key: "selectTypeState",
  default: "",
});

export const FormController = ({
  title,
  tInput,
  register,
  errors,
  arrMulCbx,
  arrSelectBx,
  disable,
  select_register,
  selectType,
}: FormControllerProps) => {
  const [typeState, setTypeState] = useRecoilState(selectTypeState);

  const InpWrapper = useCallback(
    ({ children }) => {
      return (
        <label className="form-control w-full" htmlFor="">
          <div className="label">
            <span className={`label-text ${errors && "text-red-500"}`}>
              {title}
            </span>
          </div>
          {children}
          {errors && (
            <div className="bg-red-400 px-2 rounded-lg text-white inline-block mt-2">
              <HiExclamation className="inline" />
              <span>{errors?.message}</span>
            </div>
          )}
        </label>
      );
    },
    [errors]
  );

  switch (tInput) {
    case "txtar":
      return (
        <InpWrapper>
          <textarea
            className="textarea textarea-bordered rounded-xl w-full h-32 border-black"
            placeholder="Type here"
            {...register}
            disabled={disable}
            defaultValue=""
          ></textarea>
        </InpWrapper>
      );
    case "chk":
      return (
        <InpWrapper>
          <input
            type="checkbox"
            placeholder="Type here"
            className="checkbox"
            {...register}
            disabled={disable}
          />
        </InpWrapper>
      );
    case "date":
      return (
        <InpWrapper>
          <input
            type="date"
            placeholder="Type here"
            className="input w-full rounded-xl border-black"
            {...register}
            disabled={disable}
          />
        </InpWrapper>
      );
    case "mulcbx":
      return (
        <InpWrapper>
          <div className="grid grid-cols-2 gap-1 p-2 max-h-20 overflow-auto textarea textarea-bordered rounded-xl items-start border-black">
            {arrMulCbx?.map((val: object, key: number) => (
              <label
                htmlFor={val[Object.keys(val)[0]]}
                className="flex items-center"
                key={key}
              >
                <input
                  id={val[Object.keys(val)[0]]}
                  type="checkbox"
                  key={key}
                  value={val[Object.keys(val)[0]]}
                  {...register}
                  disabled={disable}
                />
                {val[Object.keys(val)[1]]}
              </label>
            ))}
          </div>
        </InpWrapper>
      );
    case "txtselect":
      return (
        <InpWrapper>
          <div className="flex justify-between gap-x-2">
            <input
              type="text"
              placeholder="Type here"
              className="input w-1/2 rounded-xl border-black"
              {...register}
              disabled={disable}
              onChange={(e) => e.target.focus}
            />
            <select
              className="select select-bordered rounded-xl border-black"
              name="type"
              {...select_register}
              onChange={(e) => setTypeState(e.target.value)}
            >
              <option disabled value={""}>
                Đơn vị
              </option>
              {arrSelectBx?.map((val) => (
                <option value={val[Object.keys(val)[0]]}>
                  {val[Object.keys(val)[1]]}
                </option>
              ))}
            </select>
          </div>
        </InpWrapper>
      );
    case "txt":
      return (
        <InpWrapper>
          <input
            type="text"
            placeholder="Type here"
            className="input rounded-xl border-black"
            {...register}
            disabled={disable}
            onChange={(e) => e.target.focus}
          />
        </InpWrapper>
      );
    default:
      if (title.includes("tối đa")) {
        if (selectType === "percent") {
          return (
            <InpWrapper>
              <input
                type="text"
                placeholder="Type here"
                className="input rounded-xl border-black"
                {...register}
                disabled={disable}
                onChange={(e) => e.target.focus}
              />
            </InpWrapper>
          );
        }
      }
  }
};
