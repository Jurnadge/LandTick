import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { API } from "../../config/api";
import { useMutation, useQuery } from "react-query";

export default function TambahTicketAdmin() {
  let { data: stations, refetch } = useQuery("stationsCache", async () => {
    const response = await API.get("/stations");
    return response.data.data.stations;
  });

  const [form, setForm] = useState({
    name_train: "",
    type_train: "",
    start_date: "",
    start_station_id: "",
    start_time: "",
    destination_station_id: "",
    arival_time: "",
    price: "",
    qty: "",
  });

  const handleChangeAddTicket = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.set("name_train", form.name_train);
      formData.set("type_train", form.type_train);
      formData.set("start_date", form.start_date);
      formData.set("start_station_id", form.start_station_id);
      formData.set("start_time", form.start_time);
      formData.set("destination_station_id", form.destination_station_id);
      formData.set("arival_time", form.arival_time);
      formData.set("price", form.price);
      formData.set("qty", form.qty);

      const response = await API.post("/ticket", formData);
      console.log("add ticket success :", response);

      setForm({
        name_train: "",
        type_train: "",
        start_date: "",
        start_station_id: "",
        start_time: "",
        destination_station_id: "",
        arival_time: "",
        price: "",
        qty: "",
      });
    } catch (error) {
      console.log("add ticket failed :", error);
    }
  });

  useEffect(() => {
    refetch();
  }, [stations]);

  return (
    <>
      <Container>
        <h1 className="mb-5 mt-5">Tambah Ticket</h1>
        <Form
          onSubmit={(e) => {
            handleSubmit.mutate(e);
          }}
        >
          <Form.Control
            className="mb-4"
            type="text"
            name="name_train"
            value={form.name_train}
            onChange={handleChangeAddTicket}
            placeholder="Nama Kereta"
          />
          <Form.Select
            className="mb-4"
            onChange={handleChangeAddTicket}
            name="type_train"
            value={form.type_train}
          >
            <option hidden>Jenis Kereta</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Bisnis">Bisnis</option>
            <option value="Eksekutif">Eksekutif</option>
            <option value="Luxury">Luxury</option>
          </Form.Select>
          <Form.Control
            className="mb-4"
            type="text"
            placeholder="Tanggal Keberangkatan"
            name="start_date"
            value={form.start_date}
            onChange={handleChangeAddTicket}
          />
          <Form.Select
            className="mb-4"
            onChange={handleChangeAddTicket}
            name="start_station_id"
            value={form.start_station_id}
          >
            <option hidden>Stasiun Keberangkatan</option>
            {stations?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control
            className="mb-4"
            type="text"
            placeholder="Jam Keberangkatan"
            onChange={handleChangeAddTicket}
            name="start_time"
            value={form.start_time}
          />
          <Form.Select
            className="mb-4"
            onChange={handleChangeAddTicket}
            name="destination_station_id"
            value={form.destination_station_id}
          >
            <option hidden>Stasiun Tujuan</option>
            {stations?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
          <Form.Control
            className="mb-4"
            type="text"
            placeholder="Jam Tiba"
            name="arival_time"
            value={form.arival_time}
            onChange={handleChangeAddTicket}
          />
          <Form.Control
            className="mb-4"
            type="number"
            placeholder="Harga Ticket"
            name="price"
            value={form.price}
            onChange={handleChangeAddTicket}
          />
          <Form.Control
            className="mb-4"
            type="number"
            placeholder="Qty"
            name="qty"
            value={form.qty}
            onChange={handleChangeAddTicket}
          />
          <div>
            <Button type="submit">Save</Button>
          </div>
        </Form>
      </Container>
    </>
  );
}
