import { Button, Modal, ModalBody } from "react-bootstrap";

export default function DeleteData({ show, handleClose, setConfirmDelete }) {
  const handleDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body className="text-dark">
        <div style={{ fontSize: "20px", fontWeight: "900" }}>
          Delete Transaction
        </div>
        <div style={{ fontSize: "16px", fontWeight: "500" }} className="mt-2">
          Are you sure you want to delete this Transaction?
        </div>
        <div className="text-end mt-5">
          <Button
            onClick={handleDelete}
            size="sm"
            className="btn-success me-2"
            style={{ width: "135px" }}
          >
            Yes
          </Button>
          <Button
            onClick={handleClose}
            size="sm"
            className="btn-danger"
            style={{ width: "135px" }}
          >
            No
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
