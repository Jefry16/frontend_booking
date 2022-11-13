import { Button } from "antd";
import { columns } from "../table-config/providers.columns";
import CustomTable from "../components/custom-table";
import styles from "../styles/sass/provider.module.scss";
import { useState } from "react";
import NewTour from "../components/forms/new-tour";
export default function Tours() {
  const [tourForm, setTourForm] = useState(false);
  return (
    <>
      {tourForm && <NewTour onCancel={() => setTourForm(false)} />}
      <header className={styles.header}>
        <h1>Tours</h1>
        <Button type="primary" onClick={() => setTourForm(true)}>
          Nuevo tour
        </Button>
      </header>
      <CustomTable columns={columns} url='tours' />
    </>
  );
}
