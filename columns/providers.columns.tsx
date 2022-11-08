import { ColumnsType } from "antd/lib/table";

export const columns: ColumnsType = [
  {
    title: "Empresa",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Persona de contacto",
    dataIndex: "person_in_charge",
    key: "person_in_charge",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Telefono",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "¿Acepta pago?",
    dataIndex: "accept_payment",
    key: "accept_payment",
    render: (text) => {
      if (text) {
        return "si";
      }
      return "no";
    },
  },
];
