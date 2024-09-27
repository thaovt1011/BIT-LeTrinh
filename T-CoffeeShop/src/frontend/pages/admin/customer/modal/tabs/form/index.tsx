import React from "react";
import { Box } from "zmp-ui";
import _ from "lodash";
import { formFields } from "./form-field";
import { useRecoilValue } from "recoil";
import { selectedCustomerState } from "pages/admin/customer/state";
import { CSForm } from "components/csform";

export const DetailFormTab = () => {
  const selectedCustomer = useRecoilValue(selectedCustomerState);
  return (
    <Box flex flexDirection="column" className="gap-y-4">
      <CSForm fields={formFields} initialValue={selectedCustomer} />
    </Box>
  );
};
