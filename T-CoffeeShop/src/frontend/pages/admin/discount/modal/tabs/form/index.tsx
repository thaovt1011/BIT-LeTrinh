import React from "react";
import { Box } from "zmp-ui";
import _, { isEmpty, update } from "lodash";
import { formFields } from "./form-field";
import {
  useRecoilStateLoadable,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import { CSForm } from "components/csform";
import {
  conditionsTypeState,
  selectedDiscountState,
} from "pages/admin/discount/state";
import { displayInputDate } from "utils/date";
import { Condition } from "types/discount";
import { useDiscounts } from "hooks/useDiscounts";

export const DetailFormTab = () => {
  const selectedDiscount = useRecoilValue(selectedDiscountState);
  const conditionsType = useRecoilValueLoadable(conditionsTypeState);
  let { state, contents } = conditionsType;
  const { add, update } = useDiscounts();

  if (state === "hasValue" && !isEmpty(selectedDiscount)) {
    return (
      <Box flex flexDirection="column" className="gap-y-4">
        <CSForm
          fields={formFields}
          initialValue={{
            ...selectedDiscount,
          }}
          formDataPattern={() => {
            return {
              ...selectedDiscount,
              start_date: displayInputDate(
                new Date(selectedDiscount.start_date)
              ),
              end_date: displayInputDate(new Date(selectedDiscount.end_date)),
              FIRST_ORDER: selectedDiscount.conditions.find(
                (e) => e.conditionType === "FIRST_ORDER"
              )?.value,
              MIN_VALUE: selectedDiscount.conditions.find(
                (e) => e.conditionType === "MIN_VALUE"
              )?.value,
              MAX_DISCOUNT_VALUE: selectedDiscount.conditions.find(
                (e) => e.conditionType === "MAX_DISCOUNT_VALUE"
              )?.value,
            };
          }}
          arrSelectBxs={{
            type: [
              { id: "percent", val: "phần trăm" },
              { id: "value", val: "tiền" },
            ],
          }}
          onCSSubmit={(data) => {
            let getData = {
              ...data,
              conditions: [
                data.FIRST_ORDER
                  ? {
                      conditionType: "FIRST_ORDER",
                      value: Number(data.FIRST_ORDER),
                    }
                  : {},
                {
                  conditionType: "MIN_VALUE",
                  value: data.MIN_VALUE,
                },
                {
                  ...(() => {
                    if (data.type === "percent") {
                      return {
                        conditionType: "MAX_DISCOUNT_VALUE",
                        value: data.MAX_DISCOUNT_VALUE,
                      };
                    }
                    return;
                  })(),
                },
              ].filter((c) => c.conditionType),
            };

            if (data.id) {
              update(getData);
              return;
            }
            add(getData);
          }}
        />
      </Box>
    );
  }
  return;
};
