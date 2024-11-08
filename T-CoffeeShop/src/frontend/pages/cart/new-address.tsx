import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page, Header, Box, Text, Icon } from "zmp-ui";
import CustomSelect from "../../components/custom-select";
import { ListRenderer } from "components/list-renderer";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { selectedAddressState, userCurrentState } from "state";
import { OrderService } from "api/services/order.service";

export const NewAddress: React.FC = () => {
  const navigate = useNavigate();
  const setSelectedAddress = useSetRecoilState(selectedAddressState);
  const [selectedAddresses, setSelectedAddresses] = useState<string[]>([]);

  const user = useRecoilValue(userCurrentState);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (user.id) {
        const orders = await OrderService.getByUserId(user.id);
        const addresses = orders.map(order => order.shipping_address);
        setSelectedAddresses(addresses);
      }
    };

    fetchAddresses();
  }, [user.id]);

  const handleBackClick = () => {
    navigate("/cart");
  };

  const handleSaveAddress = (newAddress: string) => {
    setSelectedAddresses(prev => [...prev, newAddress]);
    // Cập nhật selectedAddressState trong store-picker
    setSelectedAddress(newAddress); // Thêm dòng này
  };

  return (
    <>
      <Header
        title="Thêm địa chỉ mới"
        showBackIcon={true}
        onBackClick={handleBackClick}
      />
      <Box
        className="section-container"
        style={{ backgroundColor: "#f0f4f7", padding: "10px" }}
      >
        <CustomSelect onSaveAddress={handleSaveAddress} />
      </Box>

      <Page
        className="section-container"
        style={{ backgroundColor: "#f0f4f7"}}
      >
        <Box className="px-4 py-3">
          <Text.Header>Địa chỉ đã lưu</Text.Header>
        </Box>
        <Box className="px-4 py-3">
          {selectedAddresses.length === 0 ? ( 
            <Text className="text-center">Không có địa chỉ gần nhất</Text> 
          ) : (
            <ListRenderer
              items={Array.from(new Set(selectedAddresses)) 
                .map(address => ({
                  left: <Icon icon="zi-location" className="my-auto" />,
                  right: address,
                }))
                .sort((a, b) => selectedAddresses.indexOf(a.right) - selectedAddresses.indexOf(b.right)).reverse()} // Sắp xếp và đảo ngược
              limit={3}
              renderLeft={(item) => item.left}
              renderRight={(item) => item.right}
              onClick={(item) => {
                setSelectedAddress(item.right);
                navigate("/cart");
              }}
            />
          )}
        </Box>
      </Page>
    </>
  );
};

export default NewAddress;
