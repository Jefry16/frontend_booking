import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/useHttp";
import FormOverlay from "./form-overlay";
import styles from "./new-provider.module.scss";
const { Item } = Form;
export default function NewTour(props: { onCancel: Function }) {
  // const { error, isLoading, sendRequest } = useHttp();
  const {
    error: providersError,
    isLoading: providersLoading,
    sendRequest
  } = useHttp();

  const [providers, setProviders] = useState([]);
  const onFinish = (values: any) => {
    if (values.accept_payment === undefined) {
      values.accept_payment = true;
    }
    // sendRequest(
    //   { url: "/providers", method: "post", body: { ...values } },
    //   (data: any) => {
    //     console.log(data);
    //     if (data.id) {
    //       showAlert();
    //       props.onCancel();
    //     }
    //   }
    // );
  };

  useEffect(() => {
    sendRequest({ url: "providers", method: "get" }, (data: any) =>
      console.log(data)
    );
  });
  const onFinishFailed = (errorInfo: any) => {};

  const showAlert = () => {
    notification.open({
      message: "tour añadido",
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
            label="Nombre"
            name="name"
            rules={[
              { required: true, message: "Inserte un nombre de proveedor" },
            ]}
          >
            <Input />
          </Item>
          <Item
            label="Precio por adulto"
            name="adultPrice"
            rules={[
              { required: true, message: "Inserte un precio por adulto" },
            ]}
          >
            <InputNumber addonAfter="$" min={1} />
          </Item>
          <Item
            label="Precio por niño"
            name="kidPrice"
            rules={[{ required: true, message: "Inserte un precio por niño" }]}
          >
            <InputNumber addonAfter="$" min={1} />
          </Item>
          <Item>
            <Select
              placeholder="Selecione un proveedor"
              showSearch
              options={providers}
              onSearch={(v: string) => {}}
            ></Select>
          </Item>
        </div>
        <Item className={styles.btns}>
          <Button type="primary" htmlType="submit" >
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
