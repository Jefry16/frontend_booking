import { ColumnsType } from "antd/lib/table";

export const columns: ColumnsType = [
  {
    title: "Nombres",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Apellidos",
    dataIndex: "last_name",
    key: "last_name",
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
    title: "Pais",
    dataIndex: "country",
    key: "country",
    render: (text) => text,
  },
];
