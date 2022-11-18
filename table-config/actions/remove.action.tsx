import Action from "../../interfaces/table-action.interface";
import { DeleteFilled } from "@ant-design/icons";
export const remove: Action = {
  label: "eliminar",
  icon: <DeleteFilled />,
  rowsLimit: Infinity,
  execute(url: string, ids: number[]) {
    console.log(url, ids);
  },
};
