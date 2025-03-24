import React, { useState, useEffect } from "react";
import { Page, Box, Select, Input, Button } from "zmp-ui";
import {
  fetchProvinces,
  fetchDistrictsByProvince,
  fetchWardsByDistrict,
} from "../data-province";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { selectedAddressState } from "../state";

interface CustomSelectProps {
  onSaveAddress: (address: string) => void; 
}

const CustomSelect: React.FC<CustomSelectProps> = ({ onSaveAddress }) => {
  const [provinces, setProvinces] = useState<{ code: string; name: string }[]>(
    []
  );
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState<{ code: string; name: string }[]>(
    []
  );
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState<{ code: string; name: string }[]>([]);
  const [selectedWard, setSelectedWard] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  const { Option } = Select;

  const navigate = useNavigate();
  const setSelectedAddress = useSetRecoilState(selectedAddressState);

  const getNameByCode = (
    code: string,
    list: { code: string; name: string }[]
  ) => {
    const foundItem = list.find((item) => item.code === code);
    return foundItem ? foundItem.name : "";
  };

  const handleConfirm = () => {
    const provinceName = getNameByCode(selectedProvince, provinces);
    const districtName = getNameByCode(selectedDistrict, districts);
    const wardName = getNameByCode(selectedWard, wards);
    const fullAddress = `${streetAddress}, ${wardName}, ${districtName}, ${provinceName}`;
    
    onSaveAddress(fullAddress); // Gọi hàm onSaveAddress khi xác nhận
    navigate("/cart");
  };

  useEffect(() => {
    fetchProvinces().then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      fetchDistrictsByProvince(selectedProvince).then((data) =>
        setDistricts(data.districts)
      );
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchWardsByDistrict(selectedDistrict).then((data) =>
        setWards(data.wards)
      );
    }
  }, [selectedDistrict]);

  return (
    <Page className="section-container">
      <Box>
        <Select
          label="Chọn Thành phố/Tỉnh"
          placeholder="Chọn Thành phố/Tỉnh"
          value={selectedProvince}
          onChange={(value: string) => setSelectedProvince(value)}
          closeOnSelect={true}
        >
          {provinces.map((province) => (
            <Option
              key={province.code}
              value={province.code}
              title={province.name}
            >
              {province.name}
            </Option>
          ))}
        </Select>

        <Select
          label="Chọn Quận/Huyện"
          placeholder="Chọn Quận/Huyện"
          value={selectedDistrict}
          onChange={(value: string) => setSelectedDistrict(value)}
          closeOnSelect={true}
          disabled={!selectedProvince}
        >
          {districts.map((district) => (
            <Option
              key={district.code}
              value={district.code}
              title={district.name}
            >
              {district.name}
            </Option>
          ))}
        </Select>

        <Select
          label="Chọn Phường/Xã"
          placeholder="Chọn Phường/Xã"
          value={selectedWard}
          onChange={(value: string) => setSelectedWard(value)}
          closeOnSelect={true}
          disabled={!selectedDistrict}
        >
          {wards.map((ward) => (
            <Option key={ward.code} value={ward.code} title={ward.name}>
              {ward.name}
            </Option>
          ))}
        </Select>

        <Input
          label="Nhập số nhà và tên đường"
          value={streetAddress}
          onChange={(e) => setStreetAddress(e.target.value)}
        />
        <Box textAlign="center">
          <Button
            fullWidth
            style={{ marginTop: "16px" }}
            onClick={handleConfirm}
            disabled={!selectedWard || !streetAddress}
          >
            XÁC NHẬN
          </Button>
        </Box>
      </Box>
    </Page>
  );
};

export default CustomSelect;
