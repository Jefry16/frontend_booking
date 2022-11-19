import { Button } from "antd";
import { columns } from "../table-config/clients.columns";
import CustomTable from "../components/custom-table";
import styles from "../styles/sass/provider.module.scss";
import { useState } from "react";
import NewClient from "../components/forms/new-client";
import NewBooking from "../components/forms/new-booking";
export default function Bookings() {
  const [bookingForm, setBookingForm] = useState(false);
  return (
    <>
      {bookingForm && <NewBooking onCancel={() => setBookingForm(false)} />}
      <header className={styles.header}>
        <h1>Reservas</h1>
        <Button type="primary" onClick={() => setBookingForm(true)}>
          Nueva reserva
        </Button>
      </header>
      <CustomTable columns={columns} url="clients" actions={[]} />
    </>
  );
}
