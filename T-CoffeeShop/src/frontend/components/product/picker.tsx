import { FinalPrice } from "components/display/final-price";
import { Sheet } from "components/fullscreen-sheet";
import React, { FC, ReactNode, Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { cartState, cartStorageState } from "state";
import { SelectedOptions } from "types/cart";
import { Product } from "types/product";
import { isIdentical } from "utils/product";
import { Box, Button, Header, Page, Text } from "zmp-ui";
import { MultipleOptionPicker } from "./multiple-option-picker";
import { QuantityPicker } from "./quantity-picker";
import { SingleOptionPicker } from "./single-option-picker";
import { useToBeImplemented } from "hooks/hooks";
import subscriptionDecor from "static/subscription-decor.svg";
import { ErrorBoundary } from "react-error-boundary";
// import { Radio } from "react-bootstrap";

export interface ProductPickerProps {
  product?: Product;
  selected?: {
    options: SelectedOptions;
    quantity: number;
  };
  children: (methods: { open: () => void; close: () => void }) => ReactNode;
}

function getDefaultOptions(product?: Product) {
  if (product && product.variants) {
    return product.variants.reduce(
      (options, variant) =>
        Object.assign(options, {
          [variant.id]: variant.type === "single" ? "m" : variant.default || [],
        }),
      {}
    );
  }
  return {};
}

export const ProductPicker: FC<ProductPickerProps> = ({
  children,
  product,
  selected,
}) => {
  return (
    <Suspense fallback={<WaitResultPage />}>
      <ErrorBoundary fallbackRender={() => <ErrorPage />}>
        <RenderProductPicker
          children={children}
          product={product}
          selected={selected}
        />
      </ErrorBoundary>
    </Suspense>
  );
};

export const RenderProductPicker: FC<ProductPickerProps> = ({
  children,
  product,
  selected,
}) => {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState<SelectedOptions>(
    selected ? selected.options : getDefaultOptions(product)
  );
  const [quantity, setQuantity] = useState(1);
  const setCart = useSetRecoilState(cartState);
  useRecoilValue(cartStorageState);

  const alertAddToCartSuccessfull = useToBeImplemented({
    position: "top",
    text:
      quantity > 0
        ? "Thêm vào giỏ hàng thành công"
        : `Đã xoá ${product?.name} khỏi giỏ hàng`,
  });

  useEffect(() => {
    if (selected) {
      setOptions(selected.options);
      setQuantity(selected.quantity);
    }
  }, [selected]);

  const addToCart = () => {
    if (product) {
      setCart((cart) => {
        let res = [...cart];
        if (selected) {
          const editing = cart.find(
            (item) =>
              item.product.id === product.id &&
              isIdentical(item.options, selected.options)
          )!;
          if (quantity === 0) {
            res.splice(cart.indexOf(editing), 1);
          } else {
            const existed = cart.find(
              (item, i) =>
                i !== cart.indexOf(editing) &&
                item.product.id === product.id &&
                isIdentical(item.options, options)
            )!;
            res.splice(cart.indexOf(editing), 1, {
              ...editing,
              options,
              quantity: existed ? existed.quantity + quantity : quantity,
            });
            if (existed) {
              res.splice(cart.indexOf(existed), 1);
            }
          }
        } else {
          const existed = cart.find(
            (item) =>
              item.product.id === product.id &&
              isIdentical(item.options, options)
          );
          if (existed) {
            res.splice(cart.indexOf(existed), 1, {
              ...existed,
              quantity: existed.quantity + quantity,
            });
          } else {
            res = res.concat({
              product,
              options,
              quantity,
            });
          }
        }
        return res;
      });
    }
    setVisible(false);
    alertAddToCartSuccessfull();
  };
  return (
    <>
      {children({
        open: () => setVisible(true),
        close: () => setVisible(false),
      })}
      {createPortal(
        <Sheet visible={visible} onClose={() => setVisible(false)} autoHeight>
          {product && (
            <Page className="space-y-2 mt-1 mx-1">
              <Box className="space-y-2">
                <Text.Title>{product.name}</Text.Title>
                <Text>
                  <FinalPrice options={options}>{product}</FinalPrice>
                </Text>
                <Text >
                  <div className=" justify-between mx-2 overflow-y-auto overflow-x-hidden max-h-56" 
                    dangerouslySetInnerHTML={{
                      __html: product.description ?? "",
                    }}
                  ></div>
                </Text>
              </Box>
              <Box className="space-y-5">
                {product.variants &&
                  product.variants.map((variant) =>
                    variant.type === "single" ? (
                      <SingleOptionPicker
                        key={variant.id}
                        variant={variant}
                        value={options[variant.id] as string}
                        onChange={(selectedOption) =>
                          setOptions((prevOptions) => ({
                            ...prevOptions,
                            [variant.id]: selectedOption,
                          }))
                        }
                      />  
                    ) : (
                      <MultipleOptionPicker
                        key={variant.id}
                        product={product}
                        variant={variant}
                        value={options[variant.id] as string[]}
                        onChange={(selectedOption) =>
                          setOptions((prevOptions) => ({
                            ...prevOptions,
                            [variant.id]: selectedOption,
                          }))
                        }
                      />
                    )
                  )}
                <QuantityPicker value={quantity} onChange={setQuantity} />
                {selected ? (
                  <Button
                    variant={quantity > 0 ? "primary" : "secondary"}
                    type={quantity > 0 ? "highlight" : "neutral"}
                    fullWidth
                    onClick={addToCart}
                  >
                    {quantity > 0
                      ? selected
                        ? "Cập nhật giỏ hàng"
                        : "Thêm vào giỏ hàng"
                      : "Xoá"}
                  </Button>
                ) : (
                  <Button
                    disabled={!quantity}
                    variant="primary"
                    type="highlight"
                    fullWidth
                    onClick={addToCart}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                )}
              </Box>
            </Page>
          )}
        </Sheet>,
        document.body
      )}
    </>
  );
};

const ErrorPage: FC = () => {
  return (
    <Box className="p-4 space-y-4 flex-1 flex flex-col justify-center items-center text-center">
      <div
        key={+new Date()}
        className="w-28 h-28 flex items-center justify-center rounded-full animate-spin"
        style={{
          animationIterationCount: 1,
        }}
      >
        <img src={subscriptionDecor} />
      </div>
      <Text.Title className="font-bold text-[#DC1F18]">
        Lỗi xảy ra trong quá trình xử lý dữ liệu
      </Text.Title>
      <Text>
        Vui lòng thử lại sau hoặc liên hệ với bộ phận hỗ trợ khách hàng
      </Text>
    </Box>
  );
};

const WaitResultPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header title="Kết quả thanh toán" />
      <Box className="p-4 space-y-4 flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-28 h-28 flex items-center justify-center rounded-full animate-spin">
          <img src={subscriptionDecor} />
        </div>
        <Text.Title className="font-bold">Đang xử lý...</Text.Title>
        <Text>Vui lòng đợi trong giây lát</Text>
      </Box>
    </Page>
  );
};
