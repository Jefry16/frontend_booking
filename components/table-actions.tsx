import { Button } from "antd";
import Action from "../interfaces/table-action.interface";

export default function TableActions(props: {
  ids: number[];
  actions: Action[];
}) {
  return (
    <div>
      {props.actions.map(
        (action) =>
          action.rowsLimit > props.ids.length && (
            <Button
              onClick={() => action.execute("delete", props.ids)}
              icon={action.icon}
              type="link"
              children={action.label}
            />
          )
      )}
    </div>
  );
}
