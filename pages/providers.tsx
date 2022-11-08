import { Button } from "antd";
import { useEffect, useState } from "react";
import { columns } from "../columns/providers.columns";
import CustomTable from "../components/custom-table";
import useHttp from "../hooks/useHttp";
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
