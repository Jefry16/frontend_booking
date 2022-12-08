import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Switch,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useFetchById,
  useFetch,
  useConnectPost,
} from "../../../hooks/connectHttp";
import styles from "../../../styles/sass/booking-page.module.scss";
const { Item } = Form;
const { Title, Paragraph } = Typography;
export default function NewExistingClient() {
  const router = useRouter();
  const [searchTour, setSearchTour] = useState("");
  const [searchHotel, setSearchHotel] = useState("");
  const [tours, setTours] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [priceAdult, setPriceAdult] = useState(0);
  const [priceKids, setPriceKids] = useState(0);
  const [adultsCount, setAdultsCount] = useState(2);
  const [kidsCount, setKidsCount] = useState(0);
  const [babiesCount, setBabiesCount] = useState(0);
  const [showDiscount, setShowDiscount] = useState<boolean>(false);
  const [discount, setDiscount] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [client, setClient] = useState<{
    id: string;
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
          value: tour.name + " " + tour.id,
          price_adult: Number(tour.price_adult),
          price_kid: Number(tour.price_kid),
        }));
      },
      onSuccess: (data: any) => {
        setTours(data);
      },
    }
  );
  const { data, isLoading, mutate } = useConnectPost();
  const { isLoading: loadingHotels } = useFetch(
    `/hotels/booking-form?search=${searchHotel}`,
    {
      enabled: Boolean(searchHotel),
      select: (data: any) => {
        return data.data.map((tour: any) => ({
          label: tour.name,
          value: tour.name + " " + tour.id,
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
      <Modal
        centered
        open={isModalOpen}
        footer={null}
        bodyStyle={{ textAlign: "center" }}
      >
        <Title level={4}>¡Listo!</Title>
        <p>La reserva ha sido creada con numero de localizador:</p>
        <Title style={{ color: "#ff36c7" }} level={3} copyable>
          {bookingId}
        </Title>
        <div className={styles.modalBtns}>
          <Button onClick={()=>window.location.href='http://localhost:3001/calendar'} type="default" children="Ir al calendario" />
          <Button type="primary" children="Ir a inicio" />
        </div>
      </Modal>
      <h2>Nueva reserva / Cliente existente / Realizar reserva</h2>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <Title level={5}>Datos del cliente</Title>
          <p className={styles.title}>Nombre:</p>
          <p className={styles.data}>{client?.first_name}</p>
          <p className={styles.title}>Apellidos:</p>
          <p className={styles.data}>{client?.last_name}</p>
          <p className={styles.title}>Email:</p>
          <p className={styles.data}>{client?.email}</p>
          <p className={styles.title}>Teléfono:</p>
          <p className={styles.data}>{client?.phone}</p>
          <p className={styles.title}>País:</p>
          <p className={styles.data}>{client?.country}</p>
        </div>
        <Divider type="vertical" className={styles.divider} />
        <div className={styles.content}>
          <Form
            className={styles.form}
            onFinish={(value: any) => {
              const { tour, adults, babies, kids, room_number, hotel, date } =
                value;
              const data = {
                adults,
                babies,
                kids,
                room_number,
                tourId: tour.split(" ").at(-1),
                hotelId: hotel.split(" ").at(-1),
                clientId: id,
                discount,
                date,
                userId: "000b0a99-d1c5-4085-b965-c944c5f37502",
              };
              mutate(
                { data, url: "bookings" },
                {
                  onError: () => {
                    console.log("error");
                  },
                  onSuccess: (data: any) => {
                    console.log(data);
                    setBookingId(data.data.id);
                    setIsModalOpen(true);
                  },
                }
              );
            }}
          >
            <div className={styles.bookingData}>
              <Title level={5}>Reserva</Title>
              <Item
                label="Tour"
                name="tour"
                rules={[{ required: true, message: "Selecione un tour" }]}
              >
                <Select
                  onSelect={(_: any, x: any) => {
                    setPriceAdult(x.price_adult);
                    setPriceKids(x.price_kid);
                  }}
                  onSearch={(value) => setSearchTour(value)}
                  showSearch
                  options={tours}
                  loading={loadingTours}
                />
              </Item>
              <Item
                label="Fecha"
                name="date"
                rules={[{ required: true, message: "Selecione una fecha" }]}
              >
                <DatePicker format="YYYY-MM-DD" />
              </Item>
              <div className={styles.pax}>
                <Item label="Adultos" name="adults" initialValue={adultsCount}>
                  <InputNumber
                    min={0}
                    step={1}
                    onChange={(value) => setAdultsCount(value as number)}
                  />
                </Item>
                <Item label="Niños" name="kids" initialValue={kidsCount}>
                  <InputNumber
                    min={0}
                    step={1}
                    onChange={(value) => setKidsCount(value as number)}
                  />
                </Item>
                <Item label="Bebés" name="babies" initialValue={babiesCount}>
                  <InputNumber
                    min={0}
                    step={1}
                    onChange={(value) => setBabiesCount(value as number)}
                  />
                </Item>
              </div>
              <Item label="Hotel" name="hotel">
                <Select
                  onSearch={(value) => setSearchHotel(value)}
                  showSearch
                  options={hotels}
                  loading={loadingHotels}
                />
              </Item>
              <Item label="Habitación" name="room_number">
                <Input />
              </Item>
            </div>
            <Divider type="vertical" className={styles.divider2} />
            <div className={styles.price}>
              <Title level={5}>Precio</Title>
              <p className={styles.priceBox}>
                Precio adulto: <span>{priceAdult}</span>
              </p>
              <p className={styles.priceBox}>
                Precio Niño: <span>{priceKids}</span>
              </p>
              <p className={styles.priceBox}>
                Precio reserva:
                <span>{priceAdult * adultsCount + priceKids * kidsCount}</span>
              </p>
              <Item label="¿Aplicar descuento?">
                <Switch onChange={(value) => setShowDiscount(value)} />
              </Item>
              {showDiscount && (
                <Item label="Descuento" name="discount" initialValue={discount}>
                  <InputNumber
                    min={0}
                    onChange={(value) => setDiscount(Number(value))}
                  />
                </Item>
              )}
              <p className={styles.priceBox}>
                Precio final:
                <span>
                  {priceAdult * adultsCount + priceKids * kidsCount - discount}
                </span>
              </p>

              <div className={styles.buttons}>
                <Button onClick={() => router.push("/bookings")} type="default">
                  Cancelar
                </Button>
                <Button htmlType="submit" type="primary">
                  Reservar
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
