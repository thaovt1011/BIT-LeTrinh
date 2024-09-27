import React from "react";
import { useLocation } from "react-router-dom";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { Modal } from "zmp-ui";
import { ModalProps } from "zmp-ui/modal";

export const modalVisibleState = atom<boolean>({
  key: "modalVisibleState",
  default: false,
});

export const CSModal = ({ ...props }: ModalProps) => {
  const [modalVisible, setModalVisible] = useRecoilState(modalVisibleState);

  return (
    <Modal
      visible={modalVisible}
      onClose={() => {
        setModalVisible(false);
      }}
      {...props}
    />
  );
};
