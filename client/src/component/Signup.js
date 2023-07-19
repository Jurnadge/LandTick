import { Container, Form, Button, Modal } from "react-bootstrap";
import cssModules from "../assets/css/LoginSignup.module.css";

import { useMutation } from "react-query";
import { API } from "../config/api";
import { useState } from "react";

export default function SignupModal({ show, showLogin, showSignup }) {
  const handleClose = () => showSignup(false);
  const changeModal = () => {
    handleClose();
    showLogin(true);
  };

  const [form, setForm] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    no_hp: "",
    gender: "",
    Address: "",
  });

  const { fullname, username, email, password, no_hp, gender, address } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      console.log("register success :", response);

      setForm({
        fullname: "",
        username: "",
        email: "",
        password: "",
        no_hp: "",
        gender: "",
        Address: "",
      });
      alert("register success");
      changeModal();
    } catch (error) {
      alert("register failed");
    }
  });

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Container className={cssModules.modalSize}>
          <Modal.Title className="text-center pt-4 pb-5 fs-3">
            Signup
          </Modal.Title>
          <Modal.Body>
            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  id="fullname"
                  name="fullname"
                  value={fullname}
                  onChange={handleChange}
                  placeholder="Full Name"
                  autofocus
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  type="number"
                  name="no_hp"
                  value={no_hp}
                  onChange={handleChange}
                  placeholder="Phone Number"
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Select
                  aria-label="Default select example"
                  onChange={handleChange}
                  name="gender"
                >
                  <option hidden>Gender</option>
                  <option value="Man">Man</option>
                  <option value="Women">Women</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Address"
                  name="address"
                  value={address}
                  onChange={handleChange}
                />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button className={cssModules.btnModalLogSign} type="submit">
                  Signup
                </Button>
              </div>
              <p className="text-center">
                Have an account?
                <b
                  variant="link"
                  onClick={changeModal}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  Login
                </b>
              </p>
            </Form>
          </Modal.Body>
        </Container>
      </Modal>
    </>
  );
}
