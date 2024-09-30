import { ReactNode } from "react";
import { Notification } from 'types/notification';

export interface MenuItem {
  label: string;
  icon: ReactNode;
  activeIcon?: ReactNode;
  notify?: number;
}
