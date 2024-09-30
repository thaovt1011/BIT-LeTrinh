import { ListItem } from "components/list-item";
import { EditPersonInfo } from "components/edit-person-info";
import React, { FC, useEffect, useState } from "react";
import {
  useRecoilValue,
  useRecoilValueLoadable,
  useSetRecoilState,
} from "recoil";
import {
  accessTokenState,
  getPhonenumber,
  requestPhoneTriesState,
  userCurrentAtom,
  userCurrentState,
} from "state";
import { CustomerService } from "api/services/customer.service";
import { phoneState } from "../../state";

export const PersonPicker: FC = () => {
  const userCurrent = useRecoilValue(userCurrentState);
  const [isEditing, setIsEditing] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  if (!userCurrent.phone_number) {
    return <RequestPersonPickerPhone />;
  }

  if (isEditing) {
    return <EditPersonInfo onClose={() => setIsEditing(false)} />;
  }

  return (
    <ListItem
      onClick={() => setIsEditing(true)}
      title={`${userCurrent.name} - 
      ${String(userCurrent.phone_number).replace("84", "0")}`}
      subtitle="Người nhận (Nhấn để chỉnh sửa)"
    />
  );
};
export const RequestPersonPickerPhone: FC = () => {
  const retry = useSetRecoilState(requestPhoneTriesState);
  const userCurrent = useRecoilValue(userCurrentState);
  const setUserCurrent = useSetRecoilState(userCurrentAtom);
  const accessToken = useRecoilValueLoadable(accessTokenState);
  let { state, contents } = accessToken;
  if (state === "hasValue") {
    return (
      <ListItem
        onClick={() => {
          let { id, name } = userCurrent;

          getPhonenumber(contents).then((res) => {
            setUserCurrent({ ...userCurrent, phone_number: res });

            (async () => {
              try {
                console.log("Calling CustomerService.update...");
                const updateResponse = await CustomerService.update({
                  id: id,
                  name: name,
                  phone_number: res,
                });
                console.log("Update response:", updateResponse);
              } catch (error) {
                console.error("Update error:", error);
              }
            })();
          }).catch((err) => {
            console.error("API error:", err);
          });

          retry((r) => r + 1);
        }}
        title="Chọn người nhận"
        subtitle="Yêu cầu truy cập số điện thoại"
      />
    );
  }

  return null;
};