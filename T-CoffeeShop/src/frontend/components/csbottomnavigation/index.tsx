import React, { FC } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./styles.scss";
import { motion } from "framer-motion";
import {
  HiArchive,
  HiArrowLeft,
  HiArrowRight,
  HiBell,
  HiDocumentDuplicate,
  HiGift,
  HiHome,
  HiIdentification,
  HiShoppingCart,
  HiTemplate,
  HiUserCircle,
} from "react-icons/hi";
import { FaUserTie, FaStore  } from "react-icons/fa";
import { MenuItem } from "types/menu";
import { Box } from "zmp-ui";
import { cartState } from "../../state";
import { useRecoilValue } from "recoil";

const tabs: Record<string, any> = {
  client: {
    "/": {
      // label: "Trang chủ",
      icon: <HiHome size={30} className="inline" />,
    },
    "/notification": {
      // label: "Thông báo",
      icon: <HiBell size={30} className="inline" />,
    },
    "/cart": {
      // label: "Giỏ hàng",
      icon: <HiShoppingCart size={30} className="inline" />,
    },
    "/profile": {
      // label: "Cá nhân",
      icon: <HiUserCircle size={30} className="inline" />,
    },
  },
  admin: {
    "/admin/dashboard": {
      // label: "Dashboard",
      icon: <HiTemplate size={30} className="inline" />,
    },
    "/admin/product": {
      // label: "Sản phẩm",
      icon: <FaStore  size={30} className="inline" />,
    },
    "/admin/order": {
      // label: "Đơn hàng",
      icon: <HiShoppingCart size={30} className="inline" />,
    },
    "/admin/customer": {
      // label: "Khách hàng",
      icon: <FaUserTie  size={30} className="inline" />,
    },

    "/admin/discount": {
      // label: "Khuyến mãi",
      icon: <HiGift size={30} className="inline" />,
    },
  },
};

export const CSBottomNavigation: FC = () => {
  const location = useLocation();
  let { pathname } = location;

  let tab = pathname.includes("admin") ? tabs["admin"] : tabs["client"];

  // const cartItem = useRecoilValue(cartState);
  // tab["/cart"].notify = cartItem.length;

  return (
    <Box className="sticky bg-green w-full py-6 shadow-lg z-50 overflow-hidden">
      <div className="relative px-10 flex justify-between">
        {Object.keys(tab).map((path) => (
          <NavLink
            key={path}
            to={path}
            style={({ isActive }) => ({
              color: isActive ? "green" : "yellow",
            })}
            children={({ isActive, isTransitioning }) => (
              <span className="overflow-hidden flex">
                {tab[path].icon}
                <motion.div
                  className={`rounded-tr-3xl rounded-br-3xl text-nowrap text-center opacity-0`}
                  initial={false}
                  animate={{
                    width: isActive ? "auto" : 0,
                  }}
                  transition={{
                    delay: 0.1,
                  }}
                >
                  <p className="opacity-0">{tab[path].label}</p>
                </motion.div>
                {isActive ? (
                  <motion.div className="circle-moving" layoutId="tabs">
                    <div className="relative h-full">
                      <motion.div
                        initial={{ opacity: 0, width: 90, paddingRight: 4 }}
                        animate={{
                          width: 90,
                          height: 30,
                          opacity: 2,
                          paddingRight: 8,
                        }}
                        transition={{
                          ease: "easeInOut",
                          delay: 0.2,
                        }}
                        // className="bg-[white] absolute text-xm top-3 left-12 rounded-tr-full rounded-br-full py-1"
                      >
                        {tab[path].label}
                      </motion.div>
                    </div>
                  </motion.div>
                ) : null}
              </span>
            )}
            className="nav-link"
          ></NavLink>
        ))}
      </div>
    </Box>
  );
};