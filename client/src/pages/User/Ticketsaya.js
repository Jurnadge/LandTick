import { Container, Row, Col, Button } from "react-bootstrap";
import logo from "../../assets/images/train-facing-right2-white.svg";
import cssModules from "../../assets/css/Ticketsaya.module.css";
import barcode from "../../assets/images/barcode.svg";
import { API } from "../../config/api";
import { useMutation, useQuery } from "react-query";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function TicketSaya() {
  let navigate = useNavigate();

  let { data: myTicket } = useQuery("myTicketCache", async () => {
    const response = await API.get("transaction-user");
    return response.data.data;
  });

  const handleBuy = async (id) => {
    try {
      const response = await API.get(`transactions/${id}`);
      navigate(`/bills/${id}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Container fluid className="mt-5 ms-5 mb-5">
        <h1>Ticket Saya</h1>
      </Container>

      {myTicket?.map((item, index) => (
        <Container key={index} className={`border border-3 px-0 rounded mb-4`}>
          <div className={`ps-3 ${cssModules.logo}`}>
            <p>
              LandTick
              <img src={logo} />
            </p>
          </div>
          <div className="pe-3" style={{ marginTop: "-25px" }}>
            <h1 className={`text-end`}>
              Kereta Api <br />
              <p className={`fs-6`}>{item.ticket.start_date}</p>
            </h1>
          </div>
          {item.status === "Pending" ? (
            <p></p>
          ) : (
            <p
              className="text-end"
              style={{ marginBottom: "-140px", paddingRight:"60px" }}
            >
              <img src={barcode} />
              <p className="pt-1" style={{paddingRight:"20px"}}>TCK101</p>
            </p>
          )}
          <Row>
            <Col xs={3}>
              <div className="ms-4">
                <h4>{item.ticket.name_train}</h4>
                <p>{item.ticket.type_train}</p>
                {item.status === "Pending" ? (
                  <div
                    className="bg-danger text-center rounded text-warning"
                    style={{ width: "68px" }}
                  >
                    <p>{item.status}</p>
                  </div>
                ) : (
                  <div
                    className="bg-success text-center rounded text-white"
                    style={{ width: "68px" }}
                  >
                    <p>{item.status}</p>
                  </div>
                )}
              </div>
            </Col>
            <Col xs={2}>
              <p>
                {item.ticket.start_time}
                <p style={{ fontSize: "13px" }}>{item.ticket.start_date}</p>
              </p>
              <br />
              <p>
                {item.ticket.arival_time}
                <p style={{ fontSize: "13px" }}>{item.ticket.start_date}</p>
              </p>
            </Col>
            <Col>
              <p>
                {item.ticket.start_station.name}
                <p style={{ fontSize: "13px" }}>
                  Stasiun {item.ticket.start_station.name}
                </p>
              </p>
              <br />
              <p>
                {item.ticket.destination_station.name}
                <p style={{ fontSize: "13px" }}>
                  Stasiun {item.ticket.destination_station.name}
                </p>
              </p>
            </Col>
          </Row>
          <Row className="text-center">
            <Col>
              <p>No. Tanda Pengenal</p>
            </Col>
            <Col>
              <p>Nama Pemesanan</p>
            </Col>
            <Col>
              <p>No. Handphone</p>
            </Col>
            <Col>
              <p>Email</p>
            </Col>
            <Col></Col>
          </Row>
          <hr style={{ marginTop: "-10px", width: "80%" }}></hr>
          <Row className="text-center mb-2">
            <Col>
              <p>ktp sensor</p>
            </Col>
            <Col>
              <p>{item.user.fullname}</p>
            </Col>
            <Col>
              <p>{item.user.no_hp}</p>
            </Col>
            <Col>
              <p>{item.user.email}</p>
            </Col>
            {item.status === "Pending" ? (
              <Col>
                <Button onClick={() => handleBuy(item.id)}>
                  Bayar Sekarang
                </Button>
              </Col>
            ) : (
              <Col>
                <Button disabled>Sudah Bayar</Button>
              </Col>
            )}
          </Row>
        </Container>
      ))}
    </>
  );
}
