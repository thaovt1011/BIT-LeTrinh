import React, { FC, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { Box } from "zmp-ui";
import HomePage from "pages/index";
import CategoryPage from "pages/category";
import CartPage from "pages/cart";
import NotificationPage from "pages/notification";
import ProfilePage from "pages/profile";
import SearchPage from "pages/search";
import CheckoutResultPage from "pages/result";
import { getStorage, getSystemInfo } from "zmp-sdk";
import { ScrollRestoration } from "./scroll-restoration";
import { OrderHistoryPage } from "pages/order-histories";
import { OrderDetailPage } from "pages/order-details";
import ProductManagePage from "pages/admin/product";
import { OrderManagePage } from "pages/admin/order";
import { CSBottomNavigation } from "./csbottomnavigation";
import { DashBoardPage } from "pages/admin/dashboard";
// import { useHandlePayment } from "hooks/hooks";
import { CustomerManagePage } from "pages/admin/customer";
import { DiscountManagePage } from "pages/admin/discount";
import { NewAddress } from "pages/cart/new-address";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authenticationState, cartState, userCurrentState } from "state";
import { CustomerService } from "api/services/customer.service";
import InfoUserPage from "pages/info_user";
import { EventName, events } from "zmp-sdk/apis";
import ContactPage from "pages/contact";

if (getSystemInfo().platform === "android") {
  const androidSafeTop = Math.round(
    (window as any).ZaloJavaScriptInterface.getStatusBarHeight() /
      window.devicePixelRatio
  );
  document.body.style.setProperty(
    "--zaui-safe-area-inset-top",
    `${androidSafeTop}px`
  );
}

export const Layout: FC = () => {
  const userCurrent = useRecoilValue(userCurrentState);
  const setCart = useRecoilValue(cartState);
  const setAuthentication = useSetRecoilState(authenticationState);

  useEffect(() => {
    // Chỉ thực hiện lưu thông tin nếu user đã có ID, tức là đã có thông tin
    if (userCurrent?.id) {
      const { id, name } = userCurrent;

      console.log('Saving user to DB: ', { id, name });
      (async () => {
        await CustomerService.create({
          id,
          name
        });
      })();

      (async () => {
        await CustomerService.auth(
          id,
          import.meta.env.VITE_APP_ID,
          setAuthentication
        );
      })();
    }
  }, [userCurrent, setAuthentication]);


  useEffect(() => {
    const loadCart = async () => {
      try {
        getStorage({
          keys: ["cart"],
        });
      } catch (error) {
        console.error("Error loading cart from storage:", error);
      }
    };

    loadCart();
  }, [setCart]);

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/notification" element={<NotificationPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/order-history" element={<OrderHistoryPage />}></Route>
          <Route path="/order-detail/:id" element={<OrderDetailPage />}></Route>
          <Route path="/admin/dashboard" element={<DashBoardPage />}></Route>
          <Route path="/admin/customer" element={<CustomerManagePage />} />
          <Route path="/admin/product" element={<ProductManagePage />} />
          <Route path="/admin/order" element={<OrderManagePage />} />
          <Route path="/admin/discount" element={<DiscountManagePage />} />
          <Route path="/result" element={<CheckoutResultPage />}></Route>
          <Route path="/info_user" element={<InfoUserPage />}></Route>
          <Route path="/newaddress" element={<NewAddress />}></Route>
          <Route path="/contact" element={<ContactPage />}></Route>

        </Routes>
      </Box>
      <CSBottomNavigation />
    </Box>
  );
};
