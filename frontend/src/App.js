import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import MainPage from "./views/MainPage";
import RegisterPage from "./views/RegisterPage";
import ErrorPage from "./views/ErrorPage";
import CalendarPage from "./views/CalendarPage";
import CalendarProvider from "./providers/calendarProvider";

function App() {
  const [loggedUser, setLoggedUser] = useState({});
  return (
    <Router>
      <CalendarProvider>
        <Header loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
      </CalendarProvider>

      <Routes>
        <Route index element={<Navigate replace to='/login' />} />
        <Route
          path='/login'
          element={<MainPage setLoggedUser={setLoggedUser} />}
        />
        <Route path='/signup' element={<RegisterPage />} />
        <Route
          path='/calendar'
          element={
            <CalendarProvider>
              <CalendarPage />
            </CalendarProvider>
          }
        />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
