import { Container, Row, Col } from "react-bootstrap";
import arrow from "../assets/images/Arrow 5.svg";
import LoginModal from "./Login";
import SignupModal from "./Signup";
import { UserContext } from "../context/userContext";
import NotifAddTicket from "./NotificationAddTicket";

import { useState, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";

// import PropTypes from "prop-types";

export default function TicketLp({startStation, destinationStation, search}) {
  const [state, dispatch] = useContext(UserContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const [showModalNotif, setShowModalNotif] = useState(false);

  setAuthToken(localStorage.token);

  let { data: tickets, refetch } = useQuery("ticketCache", async () => {
    const response = search
      ? await API.get(
          `/fil-ticket?start_station_id=${startStation}&destination_station_id=${destinationStation}`
        )
      : await API.get("/tickets");
    return response.data.data;
  });

  const handleBuy = async (id) => {
    try {
      const formData = new FormData();
      formData.set("ticket_id", id);
      const response = await API.post(`/transaction`, formData);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const [ID, setID] = useState();

  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <>
      {tickets?.map((item, index) => (
        <Container
          key={index}
          onClick={() => {
            !state.isLogin ? setShowLogin(true) : setShowModalNotif(true);
            handleBuy(item.id);
          }}
          className={`mt-3 my-auto d-block border border-3 border-radius pt-3 mb-3`}
        >
          <Row className="text-center">
            <Col xs={2}>
              <p>
                {item.name_train} <br />
                <p>{item.type_train}</p>
              </p>
            </Col>
            <Col xs={2}>
              <p>
                {item.start_time} <br />
                <p>{item.start_station.name}</p>
              </p>
            </Col>
            <Col xs={1} className="p-0">
              <img src={arrow} alt="" />
            </Col>
            <Col xs={2}>
              <p>
                {item.arival_time} <br />
                <p>{item.destination_station.name}</p>
              </p>
            </Col>
            <Col xs={2}>
              {parseInt(item.arival_time) - parseInt(item.start_time)}Jam
            </Col>
            <Col xs={3}>Rp.{item.price}</Col>
          </Row>
        </Container>
      ))}
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
      <NotifAddTicket
        showNotif={showModalNotif}
        showModalNotif={setShowModalNotif}
      />
    </>
  );
}

// TicketLp.propTypes = {
//   train: PropTypes.string,
//   trainType: PropTypes.string,
//   departTime: PropTypes.string,
//   from: PropTypes.string,
//   tiba: PropTypes.string,
//   to: PropTypes.string,
//   hours: PropTypes.string,
//   price: PropTypes.string

// }
