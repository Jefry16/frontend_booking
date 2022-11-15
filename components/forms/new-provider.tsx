import { Button, Form, Input, notification, Switch } from "antd";
import { useConnectPost } from "../../hooks/connectHttp";
import FormOverlay from "./form-overlay";
import styles from "./new-provider.module.scss";

const { Item } = Form;
export default function NewProvider(props: { onCancel: Function }) {
  const { mutate, data, isLoading } = useConnectPost();

  const onFinish = (values: any) => {
    if (values.accept_payment === undefined) {
      values.accept_payment = true;
    }
    mutate({ data: values, url: "providers" });
    props.onCancel();
    showAlert();
    console.log(data);
  };

  const onFinishFailed = (errorInfo: any) => {};

  const showAlert = () => {
    notification.open({
      message: "proveedor añadido",
      placement: "bottomLeft",
    });
  };
  return (
    <FormOverlay title="Nuevo proveedor">
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
            label="Proveedor"
            name="name"
            rules={[
              { required: true, message: "Inserte un nombre de proveedor" },
            ]}
          >
            <Input />
          </Item>

          <Item
            label="Persona a cargo"
            name="person_in_charge"
            rules={[
              {
                required: true,
                message: "Inserte un nombre de persona a cargo",
              },
            ]}
          >
            <Input />
          </Item>

          <Item
            label="Teléfono"
            name="phone"
            rules={[
              { required: true, message: "Inserte un número de teléfono!" },
            ]}
          >
            <Input />
          </Item>

          <Item
            label="Correo"
            name="email"
            rules={[
              { required: true, message: "Inserte un correo!" },
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
            label="¿Acepta pago?"
            name="accept_payment"
            valuePropName="checked"
          >
            <Switch
              checkedChildren="si"
              unCheckedChildren="no"
              defaultChecked
            />
          </Item>
        </div>
        <Item className={styles.btns}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
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
