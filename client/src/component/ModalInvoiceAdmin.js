import { Button, Modal, Col, Row, Container } from "react-bootstrap";
import train from "../assets/images/train-facing-right2-white.svg";
import barcodeKecil from "../assets/images/qr-codekecil.svg";
import barcode from "../assets/images/barcode.svg";
import cssModules from "../assets/css/ModalInvoiceAdmin.module.css";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function ModalInvoice({ showInvoice, showModalInvoice, id }) {
  const handleClose = () => showModalInvoice(false);

  let { data: transactionList } = useQuery("transactionCache", async () => {
    const response = await API.get("/transactions");
    return response.data.data;
  });

  return (
    <>
      <Modal show={showInvoice} onHide={handleClose} size="lg">
        <Modal.Header closeButton className="">
          <Modal.Title className="p-0">
            <div className={`${cssModules.logo}`}>
              <p className={`${cssModules.landtick}`}>
                LandTick <img src={train} alt="" />
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>

        {transactionList
          ?.filter((transaction) => transaction.id === id)
          ?.map((item) => {
            return (
              <Modal.Body className="ms-2">
                <h1>Invoice</h1>
                <p>Kode Invoice: INV0101</p>
                <br />

                <Row>
                  <Col>
                    <h3>Kereta Api</h3>
                    <p>{item.ticket.start_date}</p>
                    <br />
                    <br />
                    <h4>{item.ticket.name_train}</h4>
                    <p>{item.ticket.type_train}</p>
                  </Col>
                  <Col>
                    <p className="text-center">
                      <img src={barcode} alt="" />
                      <p style={{ fontSize: "12px" }}>TCK0101</p>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col xs={1}>
                    <div></div>
                  </Col>
                  <Col xs={3}>
                    <p>
                      {item.ticket.start_time}{" "}
                      <p style={{ fontSize: "12px" }}>21 February 2020</p>
                    </p>
                    <br />
                    <br />
                    <p>
                      {item.ticket.arival_time}{" "}
                      <p style={{ fontSize: "12px" }}>21 February 2020</p>
                    </p>
                  </Col>
                  <Col xs={3}>
                    <p>
                      {item.ticket.start_station.name}
                      <p style={{ fontSize: "12px" }}>
                        Stasiun {item.ticket.start_station.name}
                      </p>
                    </p>
                    <br />
                    <br />
                    <p>
                      {item.ticket.destination_station.name}{" "}
                      <p style={{ fontSize: "12px" }}>
                        Stasiun {item.ticket.destination_station.name}
                      </p>
                    </p>
                  </Col>
                  <Container className="border-top border-bottom border-dark">
                    <Row className="">
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
                    </Row>
                    <Row>
                      <Col>
                        <p>sensor ktp</p>
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
                    </Row>
                  </Container>

                  <Container className="mt-3 bg-secondary">
                    <Row>
                      <Col>
                        <h2>Total</h2>
                      </Col>
                      <Col>
                        <h2 className="text-end text-danger">
                          Rp. {item.ticket.price}
                        </h2>
                      </Col>
                    </Row>
                  </Container>
                </Row>
              </Modal.Body>
            );
          })}
      </Modal>
    </>
  );
}
