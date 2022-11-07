import { Button } from "antd";
import styles from "../styles/sass/provider.module.scss";
export default function Page() {
  return (
    <>
      <header className={styles.header}>
        <h1>Proveedores</h1>
        <Button type="primary">Nuevo proveedor</Button>
      </header>
    </>
  );
}
