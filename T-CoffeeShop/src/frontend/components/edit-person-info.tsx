import React, { FC, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userCurrentAtom, userCurrentState } from "state";

interface EditPersonInfoProps {
  onClose: () => void;
}

export const EditPersonInfo: FC<EditPersonInfoProps> = ({ onClose }) => {
  const userCurrent = useRecoilValue(userCurrentState);
  const setUserCurrent = useSetRecoilState(userCurrentAtom);
  const [phoneNumber, setPhoneNumber] = useState(userCurrent?.phone_number || "");
  const [name, setName] = useState(userCurrent?.name || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userCurrent) {
      setUserCurrent({
        ...userCurrent,
        name,
        phone_number: phoneNumber.startsWith("0") ? `84${phoneNumber.slice(1)}` : phoneNumber,
      });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-person-form" style={{ padding: '20px'}}>
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: '#2e8b57' }}>Tên:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên của bạn"
          required
          className="form-input"
          style={{ width: '100%', padding: '10px', border: '1px solid #2e8b57', borderRadius: '4px' }}
        />
      </div>
      <div className="form-group" style={{ marginBottom: '20px' }}>
        <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', color: '#2e8b57' }}>Số điện thoại:</label>
        <input
          id="phone"
          type="tel"
          value={String(phoneNumber).replace("84", "0")}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Nhập số điện thoại của bạn"
          required
          className="form-input"
          style={{ width: '100%', padding: '10px', border: '1px solid #2e8b57', borderRadius: '4px' }}
        />
      </div>
      <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button type="submit" className="btn btn-primary" style={{ padding: '10px 20px', backgroundColor: '#2e8b57', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Lưu thông tin</button>
        <button type="button" onClick={onClose} className="btn btn-secondary" style={{ padding: '10px 20px', backgroundColor: '#f0fff0', color: '#2e8b57', border: '1px solid #2e8b57', borderRadius: '4px', cursor: 'pointer' }}>Hủy bỏ</button>
      </div>
    </form>
  );
};
