import { Modal, ModalBody } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function notifAddTicket({ showNotif, showModalNotif }) {
  const handleClose = () => showModalNotif(false);
  return (
    <>
      <Modal show={showNotif} onHide={handleClose}>
        <ModalBody>
          <p className="text-center">
            Tiket anda berhasil di tambahkan silahkan segera melakukan
            pembayaran klik
            <Link to={"/ticketsaya"}>
              <b>disini</b>
            </Link>
          </p>
        </ModalBody>
      </Modal>
    </>
  );
}
