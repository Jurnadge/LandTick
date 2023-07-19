//style
import {
  Container,
  Nav,
  Navbar,
  Button,
  DropdownButton,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import cssModules from "../assets/css/Header.module.css";
import ProfileImg from "../assets/images/profile.svg";
import tiketUser from "../assets/images/ticket-user.svg";
import paymentLogo from "../assets/images/payment-user.svg";
import logoutLogo from "../assets/images/logout.svg";
import tambahticket from "../assets/images/tambahticketlogo.svg";
import { UserContext } from "../context/userContext";

//for using image
import Logo from "../assets/images/train-facing-right1.svg";

// to use a state
import { useState, useContext } from "react";

// import necessary object from react-router-dom
import { Link } from "react-router-dom";

//import popup
import LoginModal from "./Login";
import SignupModal from "./Signup";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [state, dispatch] = useContext(UserContext);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <>
      {/* Start of Navigation */}
      <Navbar expand="lg" className={cssModules.navbar}>
        <Container fluid>
          <Navbar.Brand className="ms-5">
            <Link to="/" className={cssModules.landTick}>
              LandTick
              <img
                alt=""
                src={Logo}
                className="d-inline-block align-center"
              />{" "}
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-5" />
          <Navbar.Collapse id="basic-navbar-nav">
            {/* just for make into the left */}
            <Nav className="me-auto"></Nav>
            {/* just for make into the left */}

            <Nav className="me-5">
              {/* condition login when admin : user : not logged in */}
              <>
                {state.status ? (
                  <>
                    <p className="mt-3 me-2">{state.username}</p>
                    <img src={ProfileImg} alt="" />
                    <div className="mt-2">
                      {["start"].map((direction) => (
                        <DropdownButton
                          as={ButtonGroup}
                          key={direction}
                          id={`dropdown-button-drop-${direction}`}
                          drop={direction}
                          variant="bg-light"
                        >
                          <Dropdown.Item>
                            <Link
                              to={"/tambahticketadmin"}
                              className="text-decoration-none"
                            >
                              <img src={tambahticket} alt="" /> Tambah Tiket
                            </Link>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={logout}>
                            <Link to={"/"} className="text-decoration-none">
                              <img src={logoutLogo} alt="" /> Logout
                            </Link>
                          </Dropdown.Item>
                        </DropdownButton>
                      ))}
                    </div>
                  </>
                ) : state.isLogin ? (
                  <>
                    <p className="mt-3 me-2">{state.username}</p>
                    <img src={ProfileImg} alt="" />
                    <div className="mt-2">
                      {["start"].map((direction) => (
                        <DropdownButton
                          as={ButtonGroup}
                          key={direction}
                          id={`dropdown-button-drop-${direction}`}
                          drop={direction}
                          variant="bg-light"
                        >
                          <Dropdown.Item>
                            <Link
                              to={"/ticketsaya"}
                              className="text-decoration-none"
                            >
                              <img src={tiketUser} alt="" /> Tiket Saya
                            </Link>
                          </Dropdown.Item>
                          {/* <Dropdown.Item>
                            <Link
                              to={"/bills"}
                              className="text-decoration-none"
                            >
                              <img src={paymentLogo} alt="" /> Bills
                            </Link>
                          </Dropdown.Item> */}
                          <Dropdown.Divider />
                          <Dropdown.Item onClick={logout}>
                            <Link to={"/"} className="text-decoration-none">
                              <img src={logoutLogo} alt="" /> Logout
                            </Link>
                          </Dropdown.Item>
                        </DropdownButton>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <Nav.Link>
                      <Button
                        className={cssModules.btnLog}
                        size="sm"
                        onClick={() => setShowLogin(true)}
                      >
                        Login
                      </Button>
                    </Nav.Link>

                    <Nav.Link>
                      <Button
                        className={cssModules.btnSign}
                        size="sm"
                        onClick={() => setShowSignup(true)}
                      >
                        SignUp
                      </Button>
                    </Nav.Link>
                  </>
                )}

                {/* user */}
              </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* End of Navigation */}
      <LoginModal
        show={showLogin}
        showLogin={setShowLogin}
        showSignup={setShowSignup}
      />
      <SignupModal
        show={showSignup}
        showLogin={setShowLogin}
        showSignup={setShowSignup}
      />
    </>
  );
}
