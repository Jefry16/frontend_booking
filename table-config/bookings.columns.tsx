import { ColumnsType } from "antd/lib/table";

export const columns: ColumnsType = [
  {
    title: "Nombres",
    dataIndex: "client",
    key: "client",
    render: (text) => text.first_name + " " + text.last_name,
  },
  {
    title: "Servicio",
    dataIndex: "tour",
    key: "tour",
    render: (text) => text.name,
  },
  {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
    render: (text) => text,
  },
  {
    title: "Adultos",
    dataIndex: "adults",
    key: "adults",
    render: (text) => text,
  },
  {
    title: "Niños",
    dataIndex: "kids",
    key: "kids",
    render: (text) => text,
  },
  {
    title: "Hotel",
    dataIndex: "hotel",
    key: "hotel",
    render: (text) => text.name,
  },
  {
    title: "Habitación",
    dataIndex: "room_number",
    key: "room_number",
    render: (text) => text,
  },
];
