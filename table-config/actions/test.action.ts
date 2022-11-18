import Action from "../../interfaces/table-action.interface";

export const test: Action = {
  label: "test",
  icon: "",
  rowsLimit: 3,
  execute() {
    console.log(this);
  },
};
