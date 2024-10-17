import { FinalPrice } from "components/display/final-price";
import React, { FC, useState } from "react";
import { Product } from "types/product";
import { Box, Text } from "zmp-ui";
import { ProductPicker } from "./picker";
import { color } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import { useToBeImplemented } from "hooks/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cartState, cartStorageState } from "state";
import { SelectedOptions } from "types/cart";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const [visible, setVisible] = useState(false);

  // const [quantity, setQuantity] = useState(1);
  const setCart = useSetRecoilState(cartState);
  useRecoilValue(cartStorageState);

  const alertAddToCartSuccessfull = useToBeImplemented({
    position: "top",
    text:
      true
        ? "Thêm vào giỏ hàng thành công"
        : `Đã xoá ${product?.name} khỏi giỏ hàng`,
  });


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
  
  const addToCart = (pro) => {
    console.log("Ko ...: ", pro);
    console.log("Co ...: ", {...pro});
    
    if (pro) {
      setCart((cart) => { // [.....]
        let res = [...cart];  // res = [.....]
        const existed = cart.find( // tim trong cart 
          (item) =>
            item.product.id === pro.id // dk san pham co ma = voi san pham truyen vao
        ); // existed = san pham da tim thay
        if (existed) {
          res.splice(cart.indexOf(existed), 1, { // xoa san pham cu 
            ...existed, // them san pham moi
            quantity: existed.quantity + 1, // voi so luong tang 1 don vi
          });
        } else {
          res.push({
            product: pro,
            options: {},
            quantity: 1
          });
        }
        return res;
      });
    }
    setVisible(false);
    alertAddToCartSuccessfull();
  };

  return (
    <ProductPicker product={product}>
      {({ open }) => (  
        <div className="space-y-2" >
          <Box className="w-full aspect-square relative">
            <img onClick={() => handleclick(open)} loading="lazy" src={product.image}
              className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-lg bg-skeleton"
            />
          </Box>
          <Text style={styles.productName}>{product.name}</Text>
          <Text size="xSmall" className="text-green pb-2 flex justify-between items-center px-2">
            {product.price === -1 ? ( "Liên hệ" ) : ( <FinalPrice>{product}</FinalPrice>)}
            
            <div className=""  onClick={() => handleclick(() => addToCart(product))}><FaShoppingCart size={18}/></div>
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