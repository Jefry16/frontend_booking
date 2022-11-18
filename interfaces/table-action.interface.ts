import { ReactNode } from "react";

export default interface Action {
  label: string;
  icon: ReactNode;
  rowsLimit: number;
  execute(url: string, ids: number[]): void;
}
