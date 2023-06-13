import { ReactElement, useEffect, useState } from "react";
import { Container } from "@mui/material";
import LoginScreen from "./LoginScreen";
import ProblematicReservationsListScreen from "./ProblematicReservationsListScreen";
import AppRouter from "./AppRouter";
import MainHeader from "./MainHeader/MainHeader";
type AppProps = {};

const IS_LOGGED_IN_KEY = "isLoggedIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setMail] = useState("");
  useEffect(() => {
    const storeIsLoggedIn = localStorage.getItem(IS_LOGGED_IN_KEY);

    if (storeIsLoggedIn === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    const storeMail = localStorage.getItem("EMAIL");
    setMail(storeMail);
  }, []);
  const loginHandler = (email, password) => {
    localStorage.setItem(IS_LOGGED_IN_KEY, "1");
    localStorage.setItem("EMAIL", email);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.setItem(IS_LOGGED_IN_KEY, "0");
    setIsLoggedIn(false);
  };

  return (
    <Container>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <LoginScreen onLogin={loginHandler} email={email} />}
        {isLoggedIn && <ProblematicReservationsListScreen />}
        <AppRouter />
      </main>
    </Container>
  );
}

export default App;
