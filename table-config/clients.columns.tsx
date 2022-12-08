import { ColumnsType } from "antd/lib/table";

export const columns: ColumnsType = [
  {
    title: "Nombre",
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
    title: "Teléfono",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "País",
    dataIndex: "country",
    key: "country",
    render: (text) => text,
  },
];
