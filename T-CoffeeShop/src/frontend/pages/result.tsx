import React, { FC, ReactNode, Suspense, useEffect, useState } from "react";
import axios from 'axios';
import { Box, Button, Header, Page, Text } from "zmp-ui";
import subscriptionDecor from "static/subscription-decor.svg";
import {
  AsyncCallbackFailObject,
  CheckTransactionReturns,
  Payment,
} from "zmp-sdk";
import { useLocation, useNavigate } from "react-router";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  cartState,
  invoiceState,
  orderNoteState,
  paymentResultState,
  paymentState,
  totalPriceState,
  totalQuantityState,
  userCurrentState,
  paymentSelector,
  cartStorageState,
  selectedAddressState,
  selectedDiscountToOrderState,
  tempTotalPriceState,
} from "state";
import { Discount } from "types/discount";
import { calcFinalPrice } from "utils/product";
import { ErrorBoundary } from "react-error-boundary";

interface RenderResultProps {
  title: string;
  message: string;
  color: string;
}

interface CheckoutResult extends CheckTransactionReturns {
  status: any;
  amount: number;
}

const CheckoutResultPage: FC = () => {
  return (
    <Suspense fallback={<WaitResultPage />}>
      <ErrorBoundary fallbackRender={() => <ErrorResultPage />}>
        <ResultContent />
      </ErrorBoundary>
    </Suspense>
  );
};

const ResultContent: FC = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const userCurrent = useRecoilValue(userCurrentState);
  const [paymentResult, setPaymentResult] = useState<
    CheckTransactionReturns | AsyncCallbackFailObject
  >();
  const [productsInCart, setProductsInCart] = useRecoilState(cartState);
  const quantity = useRecoilValue(totalQuantityState);
  const totalPrice = useRecoilValue(totalPriceState);
  const originalPrice = useRecoilValue(tempTotalPriceState);
  const orderNote = useRecoilValue(orderNoteState);
  const shippingAddress = useRecoilValue(selectedAddressState);
  const setPaymentStatus = useSetRecoilState(paymentResultState);
  const setPayment = useSetRecoilState(paymentState);
  const setInvoice = useSetRecoilState(invoiceState);
  const discounts = useRecoilValue<Discount[]>(selectedDiscountToOrderState);
  const resetDiscount = useResetRecoilState(selectedDiscountToOrderState);
  const resetpaymentResultState = useResetRecoilState(paymentResultState);

  useRecoilValue(paymentSelector);
  useRecoilValue(cartStorageState);

  const payment_methods_NOT_CHECKED = [
    "BANK",
    "BANK_SANDBOX",
    "COD",
    "COD_SANDBOX",
  ];
  const formatedCurrency = (val: number) => {
    return val?.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  useEffect(() => {
    let timeout;
    const check = () => {
      let data = state;
      if (typeof data === "string" && data.includes("/result")) {
        Payment.checkTransaction({
          data,
          success: (rs) => {
            if (rs) {
              createOrder(rs);
            }
            setPaymentStatus(rs.status);
            setPaymentResult(rs);

            if (rs.resultCode === 0) {
              if (rs.method !== "COD" && rs.method !== "COD_SANDBOX") {
                timeout = setTimeout(check, 3000);
              }
            }
          },
          fail: (err) => {
            setPaymentResult(err);
          },
        });
      } else {
        createOrder(data);
        setPaymentStatus(data.status);
        setPaymentResult(data);
      }
    };
    check();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (paymentResult?.resultCode >= 0) {
      setProductsInCart([]);
      resetDiscount();
      resetpaymentResultState();
    }
  }, [paymentResult]);


  const createOrder = (rs: any) => {
    setPayment({
      order_id: rs.orderId,
      payment_method: rs?.method,
      status: rs?.status,
      amount: rs?.amount,
      description: rs?.msg,
    });

    setInvoice({
      id: rs.orderId,
      customer_id: userCurrent?.id ?? "",
      products: productsInCart.map((item) => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: calcFinalPrice(item.product, item.options),
        options: item.options,
      })),
      note: orderNote,
      payment_status: rs?.status,
      total_amount: originalPrice,
      total_products: quantity,
      shipping_address: shippingAddress,
      shipping_fee: 0,
      discounts: discounts.map((d: Discount) => ({ id: d.id })),
      discount_value: totalPrice,
      status: rs?.status,
    });

  };

  if (paymentResult) {
    return (
      <Page className="flex flex-col">
        <Header title="Kết quả thanh toán" />
        {(function (render: (result: RenderResultProps) => ReactNode) {
          if ("resultCode" in paymentResult) {
            if (paymentResult?.resultCode === 1) {
              return render({
                title: "Thanh toán thành công",
                message: `Cảm ơn bạn đã mua hàng!`,
                color: "#288F4E",
              });
            }
            if (
              paymentResult?.resultCode === 0 ||
              payment_methods_NOT_CHECKED.includes(paymentResult?.method)
            ) {
              return render({
                title: "Thanh toán đang được xử lý",
                message: `Cảm ơn bạn đã mua hàng! Nhà bán hàng đã nhận được đơn hàng và đang xử lý.`,
                color: "#F4AA39",
              });
            }
          }
          return render({
            title: "Thanh toán thất bại",
            message: `Đã có lỗi xảy ra trong quá trình thanh toán, vui lòng thử lại sau! Mã lỗi: ${JSON.stringify(
              (paymentResult as AsyncCallbackFailObject).code
            )}`,
            color: "#DC1F18",
          });
        })(({ title, message, color }: RenderResultProps) => (
          <Box className="p-4 space-y-4 flex-1 flex flex-col justify-center items-center text-center">
            <div
              key={+new Date()}
              className="w-28 h-28 flex items-center justify-center rounded-full animate-spin"
              style={{
                backgroundColor: color,
                animationIterationCount: 1,
              }}
            >
              <img src={subscriptionDecor} />
            </div>
            <Text.Title className="font-bold" style={{ color }}>
              {title}
            </Text.Title>
            <Text>{message}</Text>
            {paymentResult.resultCode === 0 && 
              (paymentResult.method === "BANK" || paymentResult.method === "BANK_SANDBOX") && (
              <PaymentQRCode />
            )}
            <Box className="w-full bg-background rounded-2xl space-y-4 overflow-auto shadow-2xl p-2">
              <Text.Title className="font-bold mt-3">
                Thông tin đơn hàng
              </Text.Title>
              <Box className="flex flex-col space-y-2 justify-start items-start px-2">
                <Text className="text-start border-b leading-6 w-full">
                  <span className="font-bold">Mã đơn hàng:</span>
                  <br />
                  {paymentResult?.orderId}
                </Text>
                <Text className="text-start border-b leading-6 w-full">
                  <span className="font-bold">Phương thức thanh toán:</span>
                  <br />
                  {paymentResult?.method}
                </Text>
                <Text className="text-start border-b leading-6 w-full">
                  <span className="font-bold">Tổng tiền:</span>
                  <br />
                  {formatedCurrency(paymentResult?.amount)}
                </Text>
                <Text className="text-start border-b leading-6 w-full">
                  <span className="font-bold">Trạng thái:</span>
                  <br />
                  {paymentResult?.method === "COD"
                    ? "Chưa thanh toán (COD)"
                    : "Chuyển khoản"}
                </Text>
              </Box>

              <Button
                style={{
                  color: "#fff",
                  backgroundColor: "#288F4E",
                  marginTop: 20,
                  marginBottom: 20,
                }}
                fullWidth
                onClick={() => navigate("/")}
              >
                Quay về trang chủ
              </Button>
            </Box>
          </Box>
        ))}
      </Page>
    );
  }

  return <WaitResultPage />;
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

const PaymentQRCode = () => {
  const qrCodeUrl = "https://api.vietqr.io/image/970436-9909746315-WiKbWSl.jpg?accountName=VO%20DINH%20LUAN&amount=0";

  return (
    <div>
      <h2>QR Code Chuyển Khoản</h2>
      <img src={qrCodeUrl} alt="QR Code" width={200} height={200} />
    </div>
  );
};

const ErrorResultPage: FC = () => {
  return (
    <Page className="flex flex-col">
      <Header title="Kết quả thanh toán" />
      <Box className="p-4 space-y-4 flex-1 flex flex-col justify-center items-center text-center">
        <div className="w-28 h-28 flex items-center justify-center rounded-full animate-spin">
          <img src={subscriptionDecor} />
        </div>
        <Text.Title className="font-bold text-[#DC1F18]">
          Lỗi xảy ra trong quá trình xử lý dữ liệu
        </Text.Title>
        <Text>
          Vui lòng thử lại sau hoặc liên hệ với bộ phận hỗ trợ khách hàng
        </Text>
      </Box>
    </Page>
  );
};

export default CheckoutResultPage;