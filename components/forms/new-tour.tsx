import { Button, Form, Input, InputNumber, notification, Select } from "antd";
import { useState } from "react";
import { useConnectPost, useFetch } from "../../hooks/connectHttp";
import FormOverlay from "./form-overlay";
import styles from "./new-provider.module.scss";
const { Item } = Form;
export default function NewTour(props: { onCancel: Function }) {
  const { mutate, isError } = useConnectPost();

  const [providers, setProviders] = useState([]);

  const transformProvider = (data: any) => {
    return data.data.data.map((provider: any) => ({
      label: provider.name,
      value: provider.name + "." + provider.id,
    }));
  };

  const { isLoading } = useFetch(`providers?page=1&limit=1500`, {
    select: (data: any) => transformProvider(data),
    onSuccess: (data: any) => setProviders(data),
  });

  const onFinish = (values: any) => {
    if (values.providerId) {
      values.providerId = Number(values.providerId.split(".").at(-1));
    }
    mutate({ data: values, url: "tours" });
    props.onCancel();
    if (!isError) {
      showAlert();
    }
  };

  const onFinishFailed = (errorInfo: any) => {};

  const showAlert = () => {
    notification.open({
      message: "Tour añadido.",
      placement: "bottomLeft",
    });
  };

  return (
    <FormOverlay title="Nuevo servicio">
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
            rules={[{ required: true, message: "Inserte un nombre de tour" }]}
          >
            <Input />
          </Item>
          <Item
            label="Precio por adulto"
            name="priceAdult"
            rules={[
              { required: true, message: "Inserte un precio por adulto" },
            ]}
          >
            <InputNumber addonAfter="$" min={1} />
          </Item>
          <Item
            label="Precio por niño"
            name="priceKid"
            rules={[{ required: true, message: "Inserte un precio por niño" }]}
          >
            <InputNumber addonAfter="$" min={1} />
          </Item>
          <Item
            name="providerId"
            rules={[{ required: true, message: "Selecione un proveedor" }]}
          >
            <Select
              placeholder="Selecione un proveedor"
              showSearch
              options={[...providers]}
              onSearch={(search: string) => {}}
              loading={isLoading}
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
