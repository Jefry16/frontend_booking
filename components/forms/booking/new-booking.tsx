import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Select } from "antd";
import { useState } from "react";
import FormOverlay from "../form-overlay";
import styles from "./new-booking.module.scss";
const { Item } = Form;

export default function NewBooking(props: { onCancel: Function }) {
  const [view, setView] = useState<"choose" | "new" | "existing">("choose");

  const choose = (
    <div className={styles.question}>
      <p className={styles.title}>¿Para quien es la reserva?</p>
      <div className={styles.btnContainer}>
        <Button
          onClick={() => setView("existing")}
          className={styles.btn}
          children="Cliente ya existente"
        />
        <Button
          onClick={() => setView("new")}
          className={styles.btn}
          children="Nuevo cliente"
        />
      </div>
    </div>
  );
  const newClient = (
    <Form>
      <div>
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
          rules={[{ required: true, message: "Inserte un precio por adulto" }]}
        >
          <Input />
        </Item>
        <Item
          name="country"
          rules={[{ required: true, message: "Selecione una nacionalidad" }]}
        >
          <Select
            placeholder="Selecione una nacionalidad"
            showSearch
            options={[
              { label: "Portugal", value: "portugal" },
              { label: "Brazil", value: "brazil" },
            ]}
          ></Select>
        </Item>
      </div>
    </Form>
  );
  const existingClient = "existing";
  return (
    <FormOverlay title="Nueva reserva">
      <Button
        onClick={() => props.onCancel()}
        className={styles.back}
        type="link"
        children="Atrás"
        icon={<ArrowLeftOutlined />}
      />
      {view === "choose" && choose}
      {view === "new" && newClient}
      {view === "existing" && existingClient}
    </FormOverlay>
  );
}
