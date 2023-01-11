import Landing from "./pages/Landing"
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {

  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App
