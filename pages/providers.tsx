import { Button } from "antd";
import { columns } from "../table-config/providers.columns";
import CustomTable from "../components/custom-table";
import styles from "../styles/sass/provider.module.scss";
export default function Page() {
  return (
    <>
      <header className={styles.header}>
        <h1>Proveedores</h1>
        <Button type="primary">Nuevo proveedor</Button>
      </header>
      <CustomTable columns={columns} />
    </>
  );
}
