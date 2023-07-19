import { Container, Row, Col, Button } from "react-bootstrap";
import peringatin from "../../assets/images/error.svg";
import qrcode from "../../assets/images/qr-codekecil.svg";
import train from "../../assets/images/train-facing-right2-white.svg";
import cssModules from "../../assets/css/Bills.module.css";
import { useMutation, useQuery } from "react-query";
import { API } from "../../config/api";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function BillsUser() {
  let navigate = useNavigate();

  let p = useParams();
  let id = parseInt(p.id);

  let { data: myTicket } = useQuery("transactionCache", async () => {
    const response = await API.get(`/transactions/${id}`);
    return response.data.data;
  });

  const handleBuy = useMutation(async () => {
    try {
      const response = await API.get(`/getpayment/${id}`);
      console.log("ini response", response);

      const token = response.data.data.token;
      console.log("ini token", token);

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/tiketsaya");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/tiketsaya");
        },
        onError: function (result) {
          console.log(result);
          navigate("/tiketsaya");
        },
        onClose: function () {
          alert("Close popup kawannnn");
        },
      });
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <>
      <Container className="mt-5">
        <h1>Invoice</h1>
        <Row>
          <Col>
            <Container>
              {/* Left */}
              <Row>
                <Col xs={7}>
                  <Container className="border rounded bg-body-secondary">
                    <Row>
                      <Col xs={2}>
                        <img className="mt-4 ms-4" src={peringatin} alt="" />
                      </Col>
                      <Col>
                        <p>
                          Silahkan melakukan pembayaran melalui M-Banking,
                          E-Banking, dan ATM ke No.rek yang Tertera
                        </p>
                        <p>No. rek : 09127831646</p>
                      </Col>
                    </Row>
                  </Container>
                  {/* info user */}
                  <Container className="border rounded mt-2">
                    <Row>
                      <Col>
                        <div className={`${cssModules.logo}`}>
                          <p className={`${cssModules.landtick} ms-2`}>
                            LandTick
                            <img src={train} alt="" />
                          </p>
                        </div>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col>
                        <p className={`${cssModules.fsp}`}>
                          No. Tanda Pengenal
                        </p>
                      </Col>
                      <Col>
                        <p className={cssModules.fsp}>Nama Pemesanan</p>
                      </Col>
                      <Col>
                        <p className={cssModules.fsp}>No. Handphone</p>
                      </Col>
                      <Col>
                        <p className={cssModules.fsp}>Email</p>
                      </Col>
                    </Row>
                    <Row className="border-top border-1">
                      <Col>
                        <p className={cssModules.fsp}>ktp sensor</p>
                      </Col>
                      <Col>
                        <p className={cssModules.fsp}>
                          {myTicket?.user.fullname}
                        </p>
                      </Col>
                      <Col>
                        <p className={cssModules.fsp}>{myTicket?.user.no_hp}</p>
                      </Col>
                      <Col>
                        <p className={cssModules.fsp}>{myTicket?.user.email}</p>
                      </Col>
                    </Row>
                  </Container>
                  <h3 className="mt-3">Rincian Harga</h3>
                  <Container>
                    <Row>
                      <Col xs={8} className="border rounded mt-2">
                        {" "}
                        <Row className="mt-2">
                          <Col>
                            <p>{myTicket?.ticket.name_train} (Dewasa)x1</p>
                          </Col>
                          <Col className="text-center">
                            <p>Rp. {myTicket?.ticket.price}</p>
                          </Col>
                        </Row>
                        <Row className="bg-body-secondary">
                          <Col className="mt-2">
                            <h3>Total</h3>
                          </Col>
                          <Col className="text-center mt-2">
                            <h3>Rp. {myTicket?.ticket.price}</h3>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Container>
                  <Button
                    size="sm"
                    className="mt-3"
                    onClick={() => handleBuy.mutate(id)}
                  >
                    Bayar
                  </Button>
                </Col>
                <Col>
                  {" "}
                  {/* Right */}
                  <Container className="border">
                    <Row className="bg-body-secondary">
                      <Col className="mt-2">
                        <h3 className="mt-3 ms-3">
                          Kereta Api
                          <p style={{ fontSize: "14px" }}>
                            {myTicket?.ticket.start_date}
                          </p>
                        </h3>
                      </Col>
                      <Col className="text-end">
                        <img src={qrcode} alt="" className="mt-4 me-4" />
                        <p className="me-3">INV0101</p>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col>
                        <h4>{myTicket?.ticket.name_train}</h4>
                        <p>{myTicket?.ticket.type_train}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={1}>
                        <div></div>
                      </Col>
                      <Col>
                        <p>
                          {myTicket?.ticket.start_time}{" "}
                          <p>{myTicket?.ticket.start_date}</p>
                        </p>
                        <br />
                        <br />
                        <p>
                          {myTicket?.ticket.arival_time}
                          <p>{myTicket?.ticket.start_date}</p>
                        </p>
                      </Col>
                      <Col>
                        <p>
                          {myTicket?.ticket.start_station.name}
                          <p>Stasiun {myTicket?.ticket.start_station.name}</p>
                        </p>
                        <br />
                        <br />
                        <p>
                          {myTicket?.ticket.destination_station.name}
                          <p>
                            Stasiun {myTicket?.ticket.destination_station.name}
                          </p>
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
