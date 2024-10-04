import React, { FC } from "react";
import { Box, Button, Icon, Text } from "zmp-ui";
import { FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";

export const QuantityPicker: FC<{
  value: number;
  onChange: (quantity: number) => void;
}> = ({ value, onChange }) => {
  return (
    <Box flex className="border border-[#e9ebed] rounded-full p-[6px]">
      <Button
        disabled={value < 1}
        onClick={() => onChange(value - 1)}
        variant="secondary"
        type="neutral"
        icon={<TiMinus size={20} className="mx-auto my-auto"/>}
      />
      <Box flex justifyContent="center" alignItems="center" className="flex-1">
        <Text size="large" className="font-medium">
          Số lượng: {value}
        </Text>
      </Box>
      <Button
        onClick={() => onChange(value + 1)}
        variant="secondary"
        type="neutral"
        icon={<FaPlus size={20} className="mx-auto my-auto"/>}
      />
    </Box>
  );
};
