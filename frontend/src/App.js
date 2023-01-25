import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./views/MainPage";
function App() {
  return (
    <Router>
    
    <Routes>
      <Route path='/' element={<MainPage />} />
      <Route path='/login' element={<MainPage />} />
      {/* <Route path='/signup' element={<RegisterPage/>} /> */}
      {/* <Route path='/*' element={<ErrorPage />} /> */}
    </Routes>
  </Router>
  );
}

export default App;
