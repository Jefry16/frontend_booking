import { Button, Dropdown, MenuProps } from "antd";
import { columns } from "../../table-config/bookings.columns";
import CustomTable from "../../components/custom-table";
import styles from "../../styles/sass/provider.module.scss";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
export default function Bookings() {
  const [bookingForm, setBookingForm] = useState(false);
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      label: "Cliente existente",
      key: "item-1",
      onClick: () => {
        router.push("/bookings/client");
      },
    },
    { label: "Nuevo cliente", key: "item-2" },
  ];
  return (
    <>
      <header className={styles.header}>
        <h1>Reservas</h1>
        <Dropdown menu={{ items }}>
          <Button type="primary">
            Nueva Reserva <DownOutlined />
          </Button>
        </Dropdown>
      </header>
      <CustomTable columns={columns} url="bookings" actions={[]} />
    </>
  );
}
