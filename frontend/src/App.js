import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import MainPage from "./views/MainPage";
import RegisterPage from "./views/RegisterPage";
import ErrorPage from "./views/ErrorPage";
import CalendarPage from "./views/CalendarPage";
import Calendar from "./components/calendar/Calendar";
import CalendarProvider from "./components/calendar/calendarProvider/calendarProvider";
function App() {
  return (
    // <Calendar/>
    <Router>
      <Header />
      <Routes>
        <Route index element={<Navigate replace to='/login' />} />
        <Route path='/login' element={<MainPage />} />
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
