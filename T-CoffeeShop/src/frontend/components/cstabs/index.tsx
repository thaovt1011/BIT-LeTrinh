import { AnimatePresence } from "framer-motion";
import React, { ReactElement, useState } from "react";
import { motion } from "framer-motion";
import "./styles.scss";

export interface Tab {
  tab: ReactElement;
  icon: ReactElement;
  label: string;
}

type CSTabsProps = {
  initalTab?: number;
  layoutId?: string;
  tabs: Tab[];
};

export const CSTabs = ({ initalTab, tabs, layoutId }: CSTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<Tab>(tabs[initalTab || 0]);

  return (
    <div className="window">
      <nav className="nav-tabs">
        <ul className="text-sm">
          {tabs.map((item) => (
            <li
              key={item.label}
              className={item === selectedTab ? "selected" : ""}
              onClick={() => setSelectedTab(item)}
            >
              {item.icon}
              {`${item.label}`}
              {item === selectedTab ? (
                <motion.div
                  className="underline"
                  layoutId={`underline_${layoutId ? layoutId : ""}`}
                />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main className="py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab ? selectedTab.tab : ""}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
