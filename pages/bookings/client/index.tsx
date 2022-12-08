import { Button, Divider, Form, Input, notification, Table } from "antd";
import { Typography } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFetch } from "../../../hooks/connectHttp";
import styles from "../../../styles/sass/new-existing-client.module.scss";
import { columns } from "../../../table-config/existing-clients.columns";
const { Item } = Form;
const { Title } = Typography;
export default function NewExistingClient() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clients, setClients] = useState();
  const [selectedClient, setSelectedClient] = useState("");
  const router = useRouter();
  const { refetch, isLoading } = useFetch(
    `/clients/filtered?first_name=${name}&last_name=${lastName}&email=${email}&phone=${phone}`,
    {
      enabled: false,
      onSuccess: (data: any) => {
        setClients(data.data);
      },
    }
  );

  return (
    <div className={styles.container}>
      <h2>Nueva reserva / Cliente existente</h2>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <Title level={5}> Buscar cliente</Title>
          <p>
            Rellena al menos uno de los siguientes campos para realizar la
            búsqueda.
          </p>
          <Form
            onFinish={(values: any) => {
              const fieldsValue = Object.values(values);
              const formFilled = fieldsValue.every((x) => x === "");

              if (!formFilled) {
                refetch();
              } else {
                notification.open({
                  message: "Rellene al menos un campo de búsqueda.",
                  placement: "bottomLeft",
                });
              }
            }}
          >
            <div>
              <Item label="Nombre" initialValue={""} name="first_name">
                <Input onChange={({ target }) => setName(target.value)} />
              </Item>
              <Item label="Apellidos" initialValue={""} name="last_name">
                <Input onChange={({ target }) => setLastName(target.value)} />
              </Item>
              <Item label="Email" initialValue={""} name="email">
                <Input onChange={({ target }) => setEmail(target.value)} />
              </Item>
              <Item label="Teléfono" initialValue={""} name="phone">
                <Input onChange={({ target }) => setPhone(target.value)} />
              </Item>
            </div>
            <Button htmlType="submit" type="primary">
              Buscar
            </Button>
          </Form>
        </div>
        <Divider type="vertical" className={styles.divider} />
        <div className={styles.content}>
          <Title level={5}> Resultados de búsqueda</Title>
          <Table
            className={styles.table}
            loading={isLoading}
            rowSelection={{
              type: "radio",
              onChange: (selectedRowKeys: React.Key[], selectedRows: any) => {
                setSelectedClient(selectedRows[0].id);
              },
            }}
            pagination={{
              pageSizeOptions: [],
              pageSize: 10,
              showSizeChanger: false,
            }}
            rowKey={(record: any) => record.id}
            columns={columns}
            dataSource={clients}
          ></Table>
          <div className={styles.buttons}>
            <Button
              children="Cancelar"
              onClick={() => router.push(`/bookings`)}
              type="default"
            />
            <Button
              children="Continuar"
              onClick={() =>
                router.push(`/bookings/client/${selectedClient}`)
              }
              disabled={selectedClient === ""}
              type="primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
