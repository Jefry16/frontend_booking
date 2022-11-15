import { ColumnsType } from "antd/lib/table";

export const columns: ColumnsType = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Precio adulto",
    dataIndex: "priceAdult",
    key: "priceAdult",
    render: (text) => `$ ${text}`,
  },
  {
    title: "Precio niños",
    dataIndex: "priceKid",
    key: "priceKid",
    render: (text) => `$ ${text}`,
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
