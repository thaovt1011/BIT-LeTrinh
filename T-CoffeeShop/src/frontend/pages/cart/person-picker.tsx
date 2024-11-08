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
  authenticationState,
  getPhonenumber,
  requestPhoneTriesState,
  userCurrentAtom,
  userCurrentState,
} from "state";
import { CustomerService } from "api/services/customer.service";
import { phoneState } from "../../state";
import { getUserInfo } from "zmp-sdk";

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
  const setAuthentication = useSetRecoilState(authenticationState);
  let { state, contents } = accessToken;
  const handleRequestPermission = async () => {
    try {
      const userInfo = await getUserInfo({ autoRequestPermission: true });
      const name = userInfo.userInfo.name || "";

      const phone = await getPhonenumber(contents);
      setUserCurrent((prev) => ({ ...prev, name, id: userInfo.userInfo.id, phone_number: phone }));

      (async () => {
        try {
          console.log("Calling CustomerService.update...");
          const updateResponse = await CustomerService.update({
            id: userCurrent.id,
            name: name,
            phone_number: phone,
          });
          if (!updateResponse) {
            if (userCurrent?.id) {
              const { id, name } = userCurrent;

              console.log('Saving user to DB: ', { id, name });
              (async () => {
                await CustomerService.create({
                  id,
                  name
                });
              })();

              (async () => {
                await CustomerService.auth(
                  id,
                  import.meta.env.VITE_APP_ID,
                  setAuthentication
                );
              })();
            }
          }

          console.log("Update response:", updateResponse);
        } catch (error) {
          console.error("Update error:", error);
        }
      })();

      retry((r) => r + 1);
    } catch (error) {
      console.error("Error fetching user info or phone number:", error);
    }
  };

  if (state === "hasValue") {
    return (
      <ListItem
        onClick={handleRequestPermission}
        title="Chọn người nhận"
        subtitle="Yêu cầu truy cập số điện thoại"
      />
    );
  }

  return null;
};