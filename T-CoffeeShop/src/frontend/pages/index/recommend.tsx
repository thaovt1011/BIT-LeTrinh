import { FinalPrice } from "components/display/final-price";
import { DisplayPrice } from "components/display/price";
import { ProductPicker } from "components/product/picker";
import { Section } from "components/section";
import { ProductSlideSkeleton } from "components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { recommendProductsState } from "state";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { FaShoppingCart } from "react-icons/fa";

export const RecommendContent: FC = () => {
  const recommendProducts = useRecoilValue(recommendProductsState);


  console.log("recommend 2", recommendProducts);
  

  const handleCallPrompt = (product) => {
    if (product.price === -1) {
      const confirmCall = window.confirm('Vui lòng gọi để biết thêm thông tin về sản phẩm.');

      if (confirmCall) {
        window.location.href = 'tel:+84937355143'; // Thay số điện thoại bằng số bạn cần
      }
      return true; // Trả về true nếu đã xử lý cuộc gọi
    }
    return false;
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
    <Section title="Gợi ý cho bạn" padding="title-only">
      <Swiper
        slidesPerView={1.25}
        spaceBetween={16}
        className="px-4"
        autoplay={{ delay: 2000 }}
        modules={[Autoplay]}
      >
        {recommendProducts?.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductPicker product={product}>
              {({ open }) => (
                <div
                   onClick={() => {
                    // Nếu product.price === -1, xử lý cuộc gọi, nếu không mở ProductPicker
                    if (!handleCallPrompt(product)) {
                      open();
                    }
                  }}
                  className="space-y-3"
                >
                  <Box
                    className="relative aspect-video rounded-lg bg-cover bg-center bg-skeleton"
                    style={{ backgroundImage: `url(${product.image})` }}
                  >
                    {/* Hiển thị thông tin sale nếu có */}
                  </Box>
                  <Box className="space-y-1">
                    <Text size="small">{product.name}</Text>
                    <Text size="large" className="font-medium text-green pb-2 flex justify-between items-center px-2">
                      {product.price === -1 ? "Liên hệ" : <FinalPrice>{product}</FinalPrice>}
                      
                      <div className=""  onClick={() => addToCart(product)}><FaShoppingCart size={18}/></div>
                    </Text>
                  </Box>
                </div>
              )}
            </ProductPicker>
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(3)];

  return (
    <Section title="Gợi ý cho bạn" padding="title-only">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const Recommend: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
function setCart(arg0: (cart: any) => any[]) {
  throw new Error("Function not implemented.");
}

function setVisible(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function alertAddToCartSuccessfull() {
  throw new Error("Function not implemented.");
}

