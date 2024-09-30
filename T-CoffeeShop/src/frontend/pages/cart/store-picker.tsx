import { ListItem } from "components/list-item";
import React, { FC } from "react";
import { useRecoilState } from "recoil"; 
import { selectedAddressState } from "state"; 
import { useNavigate } from "react-router-dom";

export const RequestStorePickerLocation: FC = () => {
  const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressState); 
  const navigate = useNavigate();

  const handleUserInfo = () => {
    navigate("/newaddress");
  };

  // const handleAddressSelect = (address: string) => {
  //   setSelectedAddress(address); // Cập nhật selectedAddressState
  // };

  return (
    <ListItem
      onClick={handleUserInfo}
      title={selectedAddress || "Chọn địa chỉ"}
      subtitle={selectedAddress ? null : "Chưa chọn địa chỉ nhận hàng"}
    />
  );
};
