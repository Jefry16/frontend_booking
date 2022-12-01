import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, notification, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useFetch } from "../../../hooks/connectHttp";
import styles from "../../../styles/sass/new-existing-client.module.scss";
import { columns } from "../../../table-config/existing-clients.columns";
const { Item } = Form;
export default function NewExistingClient() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [clients, setClients] = useState();
  const [selectedClient, setSelectedClient] = useState("");
  const router = useRouter();
  const { refetch, isFetched } = useFetch(
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
          <Link href={"/bookings"}>
            <ArrowLeftOutlined />
            Atrás
          </Link>
          <p>Buscar cliente</p>
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
                  message: "rellenar al menos uno",
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
              <Item label="Correo" initialValue={""} name="email">
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

        <div className={styles.content}>
          <Table
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
          <Button
            onClick={() =>
              router.push(`/bookings/existing-client/${selectedClient}`)
            }
            disabled={selectedClient === ""}
            type="primary"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}
