import { useVirtualKeyboardVisible } from "hooks/hooks";
import React, { FC, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { MenuItem } from "types/menu";
import { BottomNavigation, Icon } from "zmp-ui";
import { CartIcon } from "./cart-icon";
import { IoMdHome, IoMdNotifications } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const tabs: Record<string, MenuItem> = {
  "/": {
    label: "Trang chủ",
    icon: <IoMdHome size={20} className="inline" />,
  },
  "/notification": {
    label: "Thông báo",
    icon: <IoMdNotifications size={20} className="inline" />,
  },
  "/cart": {
    label: "Giỏ hàng",
    icon: <CartIcon />,
    activeIcon: <CartIcon active />,
  },
  "/profile": {
    label: "Cá nhân",
    icon: <FaUser size={0} className="inline" />,
  },
};

export type TabKeys = keyof typeof tabs;

export const NO_BOTTOM_NAVIGATION_PAGES = ["/search", "/category", "/result"];

export const Navigation: FC = () => {
  const [activeTab, setActiveTab] = useState<TabKeys>("/");
  const keyboardVisible = useVirtualKeyboardVisible();
  const navigate = useNavigate();
  const location = useLocation();

  const noBottomNav = useMemo(() => {
    return NO_BOTTOM_NAVIGATION_PAGES.includes(location.pathname);
  }, [location]);

  if (noBottomNav || keyboardVisible) {
    return <></>;
  }

  return (
    <BottomNavigation
      id="footer"
      activeKey={activeTab}
      onChange={(key: TabKeys) => setActiveTab(key)}
      className="z-50"
    >
      {Object.keys(tabs).map((path: TabKeys) => (
        <BottomNavigation.Item
          key={path}
          label={tabs[path].label}
          icon={tabs[path].icon}
          activeIcon={tabs[path].activeIcon}
          onClick={() => navigate(path)}
        />
      ))}
    </BottomNavigation>
  );
};
