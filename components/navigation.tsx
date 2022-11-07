import type { MenuProps } from "antd";
import { Menu } from "antd";
import styles from "./navigation.module.scss";
import Calendar from "./svg/calendar";
import Home from "./svg/home";
import Client from "./svg/clients";
import Tour from "./svg/tour";
import Providers from "./svg/providers";
import Statistics from "./statistics";
import Finance from "./svg/finance";
import Settings from "./svg/settings";
import { useState } from "react";
import Collapse from "./svg/collapse";
import Collapsed from "./svg/collapsed";
import { useRouter } from "next/router";

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
  getItem("Inicio", "bookings", <Home />),
  getItem("Calendario", "calendar", <Calendar />),
  getItem("Clientes", "clients", <Client />),
  getItem("Tours", "tours", <Tour />),
  getItem("Proveedores", "providers", <Providers />),
  getItem("Estadisticas", "statistics", <Statistics />),
  getItem("Finanzas", "finances", <Finance />),
  getItem("Ajustes", "settings", <Settings />),
];

export default function Navigation() {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(true);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    router.push(e.key);
  };
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
        onClick={onClick}
      />
    </>
  );
}
