import { Button } from "antd";
import { useEffect, useState } from "react";
import { columns } from "../columns/providers.columns";
import CustomTable from "../components/custom-table";
import useHttp from "../hooks/useHttp";
import styles from "../styles/sass/provider.module.scss";
export default function Page() {
  const { error, isLoading, sendRequest } = useHttp();
  const [data, setData] = useState();
  useEffect(() => {
    sendRequest({ url: "/providers", method: "get" }, (data: any) => {
      console.log(data);
      setData(data.data.map((data: any) => ({ ...data, key: data.id })));
    });
  }, []);

  return (
    <>
      <header className={styles.header}>
        <h1>Proveedores</h1>
        <Button type="primary">Nuevo proveedor</Button>
      </header>
      <CustomTable loading={isLoading} columns={columns} dataSource={data} />
    </>
  );
}
