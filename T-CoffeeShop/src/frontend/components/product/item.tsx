import { FinalPrice } from "components/display/final-price";
import React, { FC } from "react";
import { Product } from "types/product";
import { Box, Text } from "zmp-ui";
import { ProductPicker } from "./picker";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const handleclick = (open: () => void) => {
    if (product.price === -1) {
      const confirmCall = window.confirm('Vui lòng gọi để biết thêm thông tin về sản phẩm.');

      // Nếu người dùng nhấn OK, sẽ thực hiện gọi điện
      if (confirmCall) {
        window.location.href = 'tel:+84937355143'; // Thay số điện thoại bằng số bạn cần
      }
      return;
    }
    open();
  };
  
  return (
    <ProductPicker product={product}>
      {({ open }) => (  
        <div className="space-y-2" onClick={() => handleclick(open)}>
          <Box className="w-full aspect-square relative">
            <img
              loading="lazy"
              src={product.image}
              className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
            />
          </Box>
          <Text style={styles.productName}>{product.name}</Text>
          <Text size="xxSmall" className="text-gray pb-2">
            {product.price === -1 ? (
              "Liên hệ"
            ) : (
              <FinalPrice>{product}</FinalPrice> 
            )}
          </Text>
        </div>
      )}
    </ProductPicker>
  );
};

const styles = {
  productName: {
    width: '180px', 
    whiteSpace: 'nowrap', // Không cho văn bản xuống dòng
    overflow: 'hidden', // Ẩn phần văn bản tràn ra ngoài
    textOverflow: 'ellipsis', // Thay thế phần văn bản bị ẩn bằng dấu ba chấm
  },
};