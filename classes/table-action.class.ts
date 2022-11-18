import { ReactNode } from "react";

export default class Action {
  constructor(
    public lable: string,
    public icon: ReactNode,
    public selectedRowsCount: number,
    public limitRows: number
  ) {}

  action() {
    console.log(this);
  }

}
