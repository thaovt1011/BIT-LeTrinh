import React, { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function RowEffect({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {children}
    </motion.div>
  );
}
