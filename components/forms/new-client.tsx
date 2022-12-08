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
          showAlert(
            "Algo salió mal. Inténtelo de nuevo o comúniquese con soporte."
          );
          props.onCancel();
        },
        onSuccess: () => {
          props.onCancel();
          showAlert("Cliente añadido.");
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
            rules={[
              { required: true, message: "Inserte al menos un apellido" },
            ]}
          >
            <Input />
          </Item>
          <Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Inserte un email" },
              {
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Email inválido",
              },
            ]}
          >
            <Input />
          </Item>
          <Item
            label="Teléfono"
            name="phone"
            rules={[
              { required: true, message: "Inserte un número de teléfono" },
            ]}
          >
            <Input />
          </Item>
          <Item
            name="country"
            rules={[{ required: true, message: "Selecione un país" }]}
          >
            <Select
              placeholder="Selecione un país"
              showSearch
              options={[
                { label: "Portugal", value: "portugal" },
                { label: "Brasil", value: "brasil" },
              ]}
            ></Select>
          </Item>
        </div>
        <Item className={styles.btns}>
          <Button
            type="default"
            htmlType="button"
            onClick={() => props.onCancel()}
          >
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Item>
      </Form>
    </FormOverlay>
  );
}
