import { ColumnsType } from "antd/lib/table";

export const columns: ColumnsType = [
  {
    title: "Nombres",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Apellidos",
    dataIndex: "lastName",
    key: "lastName",
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
    title: "Nacionalidad",
    dataIndex: "country",
    key: "country",
    render: (text) => text,
  },
];
