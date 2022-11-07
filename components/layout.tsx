import { Menu, MenuProps } from "antd";
import React from "react";
import styles from "./layout.module.scss";
import Navigation from "./navigation";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <div className={styles.layout}>
      <aside className={styles.aside}>
        <Navigation />
      </aside>
      <main className={styles.main}>{props.children}</main>
    </div>
  );
}
