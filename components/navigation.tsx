import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./navigation.module.scss";
import Calendar from "./svg/calendar";
import Home from "./svg/home";
import Client from "./svg/clients";
import Tour from "./svg/tour";
import Providers from "./svg/providers";
import Statistics from "./svg/statistics";
import Finance from "./svg/finance";
import Settings from "./svg/settings";
import { useState } from "react";
import Collapse from "./svg/collapse";
import Collapsed from "./svg/collapsed";
import { useRouter } from "next/router";
import Link from "next/link";
import NavLink from "./nav-link";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(<NavLink href="/bookings" name="Bookings" />, "bookings", <Home />),
  getItem(
    <NavLink href="/calendar" name="Calendario" />,
    "calendar",
    <Calendar />
  ),
  getItem(<NavLink name="Tours" href="/tours" />, "tours", <Tour />),
  getItem(<NavLink name="Clientes" href="/clients" />, "clients", <Client />),
  getItem(
    <NavLink name="Proveedores" href="/providers" />,
    "providers",
    <Providers />
  ),
];

export default function Navigation() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <div
        className={styles.expandbtn}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <Collapse /> : <Collapsed />}
      </div>
      <Menu
        style={{ height: "100%", boxShadow: "4px 0px 5px rgba(0, 0, 0, 0.1)" }}
        inlineCollapsed={collapsed}
        mode="inline"
        items={items}
        defaultSelectedKeys={[router.pathname.substring(1)]}
        defaultOpenKeys={[router.pathname.substring(1)]}
      />
    </>
  );
}
