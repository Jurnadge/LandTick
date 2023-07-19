import { Container, Col, Row } from "react-bootstrap";
import ListTransaksiAdmin from "../../component/ListTransaksiForAdmin";

export default function admin() {
  return (
    <>
      <Container className="mt-5">
        <h1>List Transaksi</h1>
      </Container>

      <Container>
        <Row>
          <Col>
            <p>No.</p>
          </Col>
          <Col>
            <p>Users</p>
          </Col>
          <Col>
            <p>Tiket</p>
          </Col>
          <Col>
            <p>Bukti Transfer</p>
          </Col>
          <Col>
            <p>Status Payment</p>
          </Col>
          <Col>
            <p>Action</p>
          </Col>
        </Row>
      </Container>

      <ListTransaksiAdmin/>
    </>
  );
}
