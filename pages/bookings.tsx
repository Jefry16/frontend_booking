import { Button } from "antd";
import { columns } from "../table-config/clients.columns";
import CustomTable from "../components/custom-table";
import styles from "../styles/sass/provider.module.scss";
import { useState } from "react";
import NewClient from "../components/forms/new-client";
export default function Bookings() {
  const [providerForm, setProviderForm] = useState(false);
  return (
    <>
      {providerForm && <NewClient onCancel={() => setProviderForm(false)} />}
      <header className={styles.header}>
        <h1>Reservas</h1>
        <Button type="primary" onClick={() => setProviderForm(true)}>
          Nueva reserva
        </Button>
      </header>
      <CustomTable columns={columns} url="clients" actions={[]} />
    </>
  );
}
