import Header from "./component/Header";
import Home from "./pages/Home";
import TicketSaya from "./pages/User/Ticketsaya";
import BillsUser from "./pages/User/Bills";
import ListTransaksi from "./pages/Admin/ListTransaksi";
import TambahTicket from "./pages/Admin/TambahTicket";

import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminPrivateRoute from "./privateroute/AdminPrivateRoute";
import UserPrivateRoute from "./privateroute/UserPrivateRoute";

function App() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check/auth");
      let payload = response.data.data;
      payload.token = localStorage.token;

      // dispatch({
      //   type: "ADMIN_LOGIN_SUCCESS",
      //   payload,
      // });
      // setIsLoading(false);

      dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("Check User Failed :", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  return (
    // define <BrowserRouter> as parent element
    <>
      <Header />
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route exact path="/" element={<UserPrivateRoute />}>
            <Route path="/ticketsaya" element={<TicketSaya />} />
            <Route path="/bills/:id" element={<BillsUser />} />
          </Route>
          <Route exact path="/" element={<AdminPrivateRoute />}>
            <Route path="/listtransaksiadmin" element={<ListTransaksi />} />
            <Route path="/tambahticketadmin" element={<TambahTicket />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
