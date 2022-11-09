import { Button, Form, Input, Switch } from "antd";
import FormOverlay from "./form-overlay";
// import styles from "./new-provider.module.scss";
const { Item } = Form;
export default function NewProvider(props: { onCancel: Function }) {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <FormOverlay title="titulo">
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
        <Item
          label="Proveedor"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Item>

        <Item
          label="Persona a cargo"
          name="person_in_charge"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Item>

        <Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Item>

        <Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Item>
        <Item label="Phone" name="ok" valuePropName="checked">
          <Switch checkedChildren="si" unCheckedChildren="no" defaultChecked />
        </Item>
        <Item>
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
