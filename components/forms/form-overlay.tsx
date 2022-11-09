import { Divider } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import style from "./form-overlay.module.scss";
const FormOverlay = (props: { children: ReactNode; title: string }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted
    ? createPortal(
        <div className={style.overlay}>
          <div className={style.container}>
            <h2 className={style.title}>{props.title}</h2>
            <Divider className={style.divider} />
            {props.children}
          </div>
        </div>,
        document.querySelector("#form-overlay")!
      )
    : null;
};

export default FormOverlay;
