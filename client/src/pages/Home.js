import { useContext, useEffect, useState } from "react";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import cssModules from "../assets/css/Home.module.css";
import iklan from "../assets/images/Iklan.png";
import trainIcon from "../assets/images/icons-train.png";
import switchAboard from "../assets/images/switch-aboard.png";

// import component here
import TicketLp from "../component/TicketLandingPage";
import { API } from "../config/api";

import { useQuery } from "react-query";

function Home() {
  const [stations, setStations] = useState([]);
  const [form, setForm] = useState({
    start_station_id: "",
    destination_station_id: "",
  });


  const getStations = async () => {
    try {
      const response = await API.get("/stations");
      setStations(response.data.data.stations);
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [search, setSearch] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    form.start_station_id == "" && form.destination_station_id == ""
      ? setSearch(false)
      : setSearch(true);
  };

  useEffect(() => {
    getStations();
  }, []);

  return (
    <>
      {/* Section Ad */}
      <Container fluid className={`${cssModules.container}`}>
        <Row>
          <Col className="ms-5 pt-5">
            <p className={cssModules.h1Text}>Selamat Pagi, Ticket Seekers.</p>
            <div className="ms-3 fs-4">
              <p className={cssModules.pText}>
                Ingin Pulkam dengan Good Deal? <br />
                Masuk atau Daftar Sekarang
              </p>
            </div>
          </Col>

          <Col className="mb-5">
            <div>
              <img alt="" src={iklan} className="mx-auto d-block mt-5" />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Section Find Ticket */}
      <Container className={`border ${cssModules.containerFindTicket}`}>
        <Form id="ticket-search-form">
          <Row className={``}>
            <Col sm={3} className={`border pt-3 px-0 ${cssModules.train}`}>
              <div className={`border-start border-5 border-warning bg-light`}>
                <p className={`${cssModules.fontAvenir}`}>
                  <img src={trainIcon} alt="" /> Tiket Kereta Api
                </p>
              </div>
            </Col>
            <Col sm={8} className="ms-5 mb-3">
              <h4 className={`mt-2`}>Tiket Kereta Api</h4>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Asal</Form.Label>
                    <Form.Select
                      name="start_station_id"
                      value={form.start_station_id}
                      onChange={handleChange}
                    >
                      <option hidden>From</option>
                      {stations?.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Row>
                    <Col xs={6} className="mt-3">
                      <Form.Group>
                        <Form.Label>Tanggal Berangkat</Form.Label>
                        <Form.Control type="date" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Check
                        label="Pulang Pergi"
                        inline
                        className={`mt-3`}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm={1} className="ps-2">
                  <img className={`mt-4`} src={switchAboard} alt="" />
                </Col>
                <Col>
                  <Form.Label>Tujuan</Form.Label>
                  <Form.Select
                    name="destination_station_id"
                    value={form.destination_station_id}
                    onChange={handleChange}
                  >
                    <option hidden>To</option>
                    {stations?.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Row className="mt-3">
                    {" "}
                    <Col>
                      <Form.Label>Dewasa</Form.Label>
                      <Form.Select>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Label>Bayi</Form.Label>
                      <Form.Select>
                        <option>0</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <Button
                        className={`${cssModules.btnFindTicket}`}
                        type="submit"
                        onClick={handleClick}
                      >
                        Cari tiket
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* Ticket table */}
      <Container className={`mt-5 my-auto d-block`}>
        <Row className="text-center">
          <Col xs={2}>Nama Kereta</Col>
          <Col xs={2}>Berangkat</Col>
          <Col xs={1}></Col>
          <Col xs={2}>Tiba</Col>
          <Col xs={2}>Durasi</Col>
          <Col xs={3}>Harga Per Orang</Col>
        </Row>
      </Container>

      {/* Ticket */}
      <TicketLp startStation={form.start_station_id} destinationStation={form.destination_station_id} search={search} />
    </>
  );
}

export default Home;
