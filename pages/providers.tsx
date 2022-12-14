import { Button } from "antd";
import { columns } from "../table-config/providers.columns";
import CustomTable from "../components/custom-table";
import styles from "../styles/sass/provider.module.scss";
import NewProvider from "../components/forms/new-provider";
import { useState } from "react";
export default function Providers() {
  const [providerForm, setProviderForm] = useState(false);
  return (
    <div className={styles.container}>
      {providerForm && <NewProvider onCancel={() => setProviderForm(false)} />}
      <header className={styles.header}>
        <h1>Proveedores</h1>
        <Button type="primary" onClick={() => setProviderForm(true)}>
          Nuevo proveedor
        </Button>
      </header>
      <CustomTable columns={columns} url="providers" actions={[]} />
    </div>
  );
}
