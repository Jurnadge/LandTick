import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import searchButton from "../assets/images/search.svg";
import editButton from "../assets/images/editbutton.svg";
import trashButton from "../assets/images/trash.svg";
import ModalEditStatus from "./ModalEditStatus";
import ModalInvoiceAdmin from "./ModalInvoiceAdmin";
import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import DeleteData from "../component/ModalDelete";

export default function ListTransaksiAdmin() {
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [idTransaction, setIdTransaction] = useState();

  const [idDelete, setidDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setidDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`transactions/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  let { data: transaction, refetch } = useQuery(
    "transactionCache",
    async () => {
      const response = await API.get("/transactions");
      return response.data.data;
    }
  );

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      {transaction?.map((item, index) => (
        <>
          <hr style={{ width: "85%", margin: "auto" }} />
          <Container key={index} className="mt-3">
            <Row>
              <Col>
                <p>{index+1}</p>
              </Col>
              <Col>
                <p>{item?.user.fullname}</p>
              </Col>
              <Col>
                <p>
                  {item?.ticket.start_station.name}-
                  {item?.ticket.destination_station.name}
                </p>
              </Col>
              <Col>
                <p>bca.jpg</p>
              </Col>
              <Col>
                <p>{item.status}</p>
              </Col>
              <Col>
                <img
                  src={searchButton}
                  alt=""
                  className="me-4"
                  onClick={() => {
                    setShowModalInvoice(true);
                    setIdTransaction(item.id);
                  }}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={editButton}
                  alt=""
                  className="me-4"
                  onClick={() => setShowModalEdit(true)}
                  style={{ cursor: "pointer" }}
                />
                <img
                  src={trashButton}
                  alt=""
                  onClick={() => handleDelete(item.id)}
                />
              </Col>
            </Row>
          </Container>
        </>
      ))}
      <ModalEditStatus
        showEdit={showModalEdit}
        showModalEdit={setShowModalEdit}
      />
      <ModalInvoiceAdmin
        showInvoice={showModalInvoice}
        showModalInvoice={setShowModalInvoice}
        id={idTransaction}
      />
      <DeleteData
        show={show}
        setConfirmDelete={setConfirmDelete}
        handleClose={handleClose}
      />
    </>
  );
}
