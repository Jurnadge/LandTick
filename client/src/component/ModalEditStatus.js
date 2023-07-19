import { Button, Modal, Form } from "react-bootstrap";
import train from "../assets/images/train-facing-right2-white.svg";
import cssModules from "../assets/css/ModalEditStatus.module.css";

export default function ModalEditStatus({ showEdit, showModalEdit }) {
  const handleClose = () => showModalEdit(false);

  return (
    <>
      <Modal show={showEdit} size="sm" onHide={handleClose}>
        <Modal.Header closeButton className="">
          <Modal.Title className="p-0">
            <div className={`${cssModules.logo}`}>
              <p className={`${cssModules.landtick}`}>
                LandTick <img src={train} alt="" />
              </p>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Control type="number" value={1} disabled className="mb-4" />
            <Form.Control
              type="text"
              value={"Anto"}
              disabled
              className="mb-4"
            />
            <Form.Control
              type="text"
              value={"Surabaya - Jakarta"}
              disabled
              className="mb-4"
            />
            <Form.Control
              type="text"
              value={"bca.jpg"}
              disabled
              className="mb-4"
            />
            <Form.Control
              type="text"
              value={"pending"}
              className="mb-4"
            />
            <div className="d-grid gap-2">
              <Button className="text-center">Save</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
