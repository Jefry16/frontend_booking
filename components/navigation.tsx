import type { MenuProps } from "antd";
import { Menu } from "antd";
import { AppstoreOutlined } from "@ant-design/icons";

import Calendar from "./svg/calendar";
import Home from "./svg/home";
import Client from "./svg/clients";
import Tour from "./svg/tour";
import Providers from "./svg/providers";
import Statistics from "./statistics";
import Finance from "./svg/finance";
import Settings from "./svg/settings";

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
  getItem("Inicio", "start", <Home />),
  getItem("Calendario", "calendar", <Calendar />),
  getItem("Clientes", "clients", <Client />),
  getItem("Tours", "tours", <Tour />),
  getItem("Proveedores", "providers", <Providers />),
  getItem("Estadisticas", "statistics", <Statistics />),
  getItem("Finanzas", "finances", <Finance />),
  getItem("Ajustes", "settings", <Settings />),
];

export default function Navigation() {
  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };
  return (
    <Menu
      inlineCollapsed={true}
      mode="vertical"
      items={items}
      onClick={onClick}
    />
  );
}
