import { Button, Form, Input, notification, Select } from "antd";
import { useConnectPost } from "../../hooks/connectHttp";
import FormOverlay from "./form-overlay";
import styles from "./new-provider.module.scss";
const { Item } = Form;

export default function NewClient(props: { onCancel: Function }) {
  const mutation = useConnectPost();

  const onFinish = (values: any) => {
    mutation.mutate(
      { data: values, url: "clients" },
      {
        onError: () => {
          showAlert("algo salio mal");
          props.onCancel();
        },
        onSuccess: () => {
          props.onCancel();
          showAlert("cliente añadido");
        },
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {};

  const showAlert = (message: string) => {
    notification.open({
      message,
      placement: "bottomLeft",
    });
  };

  return (
    <FormOverlay title="Nuevo cliente">
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        style={{
          backgroundColor: "#FCFCFC",
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
        }}
      >
        <div className={styles.group}>
          <Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: "Inserte al menos un nombre" }]}
          >
            <Input />
          </Item>
          <Item
            label="Apellidos"
            name="lastName"
            rules={[{ required: true, message: "Inserte al menos apellidos" }]}
          >
            <Input />
          </Item>
          <Item
            label="Correo"
            name="email"
            rules={[
              { required: true, message: "Inserte un correo" },
              {
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "correo invalido!",
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            label="Telefono"
            name="phone"
            rules={[
              { required: true, message: "Inserte un precio por adulto" },
            ]}
          >
            <Input />
          </Item>
          <Item
            name="country"
            rules={[{ required: true, message: "Selecione un pais" }]}
          >
            <Select
              placeholder="Selecione un pais"
              showSearch
              options={[
                { label: "Portugal", value: "portugal" },
                { label: "Brazil", value: "brazil" },
              ]}
            ></Select>
          </Item>
        </div>
        <Item className={styles.btns}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => props.onCancel()}
          >
            Cancelar
          </Button>
        </Item>
      </Form>
    </FormOverlay>
  );
}
