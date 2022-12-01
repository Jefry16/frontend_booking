import { ArrowLeftOutlined } from "@ant-design/icons";
import { DatePicker, Form, Input, InputNumber, Select } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFetchById, useFetch } from "../../../hooks/connectHttp";
import styles from "../../../styles/sass/new-existing-client.module.scss";
const { Item } = Form;

export default function NewExistingClient() {
  const router = useRouter();
  const [searchTour, setSearchTour] = useState("");
  const [searchHotel, setSearchHotel] = useState("");
  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [client, setClient] = useState<{
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    country: string;
  } | null>();
  const { id } = router.query;

  const { refetch } = useFetchById(
    id as string,
    {
      url: "/clients",
    },
    {
      enabled: false,
      onSuccess: (data: any) => {
        setClient(data.data);
      },
    }
  );

  const { isLoading: loadingTours } = useFetch(
    `/tours/booking-form?search=${searchTour}`,
    {
      enabled: Boolean(searchTour),
      select: (data: any) => {
        return data.data.map((tour: any) => ({
          label: tour.name,
          value: tour.name,
        }));
      },
      onSuccess: (data: any) => {
        setHotels(data);
      },
    }
  );

  const { isLoading: loadingHotels } = useFetch(
    `/hotels/booking-form?search=${searchHotel}`,
    {
      enabled: Boolean(searchHotel),
      select: (data: any) => {
        return data.data.map((tour: any) => ({
          label: tour.name,
          value: tour.name,
        }));
      },
      onSuccess: (data: any) => {
        setHotels(data);
      },
    }
  );

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id]);

  return (
    <div className={styles.container}>
      <h2>Nueva reserva / Cliente existente / realizar reserva</h2>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <Link href={"/bookings"}>
            <ArrowLeftOutlined />
            Atrás
          </Link>
          <h3>Datos del cliente</h3>
          <p>Nombres:</p>
          <p>{client?.first_name}</p>
          <p>Apellidos:</p>
          <p>{client?.last_name}</p>
          <p>Correo:</p>
          <p>{client?.email}</p>
          <p>Teléfono:</p>
          <p>{client?.phone}</p>
          <p>País:</p>
          <p>{client?.country}</p>
        </div>

        <div className={styles.content}>
          <h3>Reserva:</h3>
          <Form>
            <div>
              <Item label="Tour" name="tour">
                <Select
                  onSearch={(value) => setSearchTour(value)}
                  showSearch
                  options={tours}
                  loading={loadingTours}
                />
              </Item>
              <Item label="Fecha" name="date">
                <DatePicker />
              </Item>
              <Item label="Adultos" name="adults">
                <InputNumber min={0} step={1} defaultValue={2} />
              </Item>
              <Item label="Niños" name="kids">
                <InputNumber min={0} step={1} defaultValue={0} />
              </Item>
              <Item label="Bebes" name="babies">
                <InputNumber min={0} step={1} defaultValue={0} />
              </Item>
              <Item label="Hotel" name="hotel">
                <Select
                  onSearch={(value) => setSearchHotel(value)}
                  showSearch
                  options={hotels}
                  loading={loadingHotels}
                />
              </Item>
              <Item label="Habitacíon" name="room_number">
                <Input />
              </Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
