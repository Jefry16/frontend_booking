import { ColumnsType } from "antd/lib/table";

export const columns: ColumnsType = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Precio adulto",
    dataIndex: "price_adult",
    key: "price_adult",
    render: (text) => `$ ${text}`,
  },
  {
    title: "Precio niño",
    dataIndex: "price_kid",
    key: "price_kid",
    render: (text) => `$ ${text}`,
  },
  {
    title: "Proveedor",
    dataIndex: "provider",
    key: "provider",
    render: (text) => `${text.name}`,
  },
  // {
  //   title: "Proveedor",
  //   dataIndex: "provider",
  //   key: "provider",
  //   render:(text) =>{
  //     if(text){
  //       return text
  //     }
  //     return '*'
  //   }
  // },
];
