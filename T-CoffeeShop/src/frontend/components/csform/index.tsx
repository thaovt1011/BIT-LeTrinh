import React, { useEffect, useRef, useState } from "react";
import {
  FieldError,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import { FormController, selectTypeState } from "./form-controller";
import { isEmpty } from "lodash";
import _ from "lodash";
import { CSFormProps } from "./types";
import { useRecoilState } from "recoil";

export const CSForm = ({
  onCSSubmit,
  fields,
  initialValue,
  formDataPattern,
  btnSubmit,
  arrMulCbxs,
  arrSelectBxs,
  children,
}: CSFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    mode: "all",
    defaultValues: {},
  });

  const [typeState, setTypeState] = useRecoilState(selectTypeState);

  const onSubmit: SubmitHandler<any> = (data) => {
    if (typeof onCSSubmit === "function") {
      onCSSubmit(data);
    }
  };

  useEffect(() => {
    let formInitialData = formDataPattern
      ? formDataPattern(initialValue)
      : initialValue;

    if (!isEmpty(initialValue)) {
      reset(formInitialData);
    } else {
      document.querySelector<HTMLFormElement>("#CSForm")?.reset();
    }
  }, [initialValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" id="CSForm">
      {children}
      {fields.map((val, key) => {
        return (
          <div key={key}>
            <FormController
              title={val.title}
              tInput={val.type}
              register={{
                ...register(
                  val.field,
                  (() => {
                    if (val.validate) {
                      return { required: `${val.validate.message}` };
                    }
                    return;
                  })()
                ),
              }}
              select_register={
                {
                  ...(() => {
                    if (val.select_field) {
                      return {
                        ...register(
                          val.select_field,
                          (() => {
                            if (val.validate) {
                              return { required: `${val.validate.message}` };
                            }
                            return;
                          })()
                        ),
                      };
                    }
                    return;
                  })(),
                } as UseFormRegisterReturn<any>
              }
              selectType={typeState}
              arrMulCbx={arrMulCbxs ? arrMulCbxs[val.field] : undefined}
              arrSelectBx={
                arrSelectBxs && val.select_field
                  ? arrSelectBxs[val.select_field]
                  : undefined
              }
              errors={errors[val.field] as FieldError}
              disable={!!!onCSSubmit}
            />
          </div>
        );
      })}
      {onCSSubmit &&
        (btnSubmit || (
          <button type="submit" className="btn btn-neutral rounded-md">
            Save
          </button>
        ))}
    </form>
  );
};
