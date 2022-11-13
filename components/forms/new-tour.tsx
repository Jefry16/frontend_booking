import { Alert, Button, Form, Input, notification, Switch } from "antd";
import useHttp from "../../hooks/useHttp";
import FormOverlay from "./form-overlay";
import styles from "./new-provider.module.scss";
const { Item } = Form;
export default function NewTour(props: { onCancel: Function }) {
  const { error, isLoading, sendRequest } = useHttp();
  const onFinish = (values: any) => {
    if (values.accept_payment === undefined) {
      values.accept_payment = true;
    }
    sendRequest(
      { url: "/providers", method: "post", body: { ...values } },
      (data: any) => {
        console.log(data);
        if (data.id) {
          showAlert();
          props.onCancel();
        }
      }
    );
  };

  const onFinishFailed = (errorInfo: any) => {};

  const showAlert = () => {
    notification.open({
      message: "proveedor añadido",
      placement: "bottomLeft",
    });
  };
  return (
    <FormOverlay title="Nuevo tour">
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
