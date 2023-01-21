import Landing from "./pages/Landing";
import Login from "./pages/Login";
import News from "./pages/News";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "./features/auth";
import { fetchSources, setSource } from "./features/auth";
import { AppDispatch } from "./features/store";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const user = window.localStorage.getItem("user");
    const token = window.localStorage.getItem("token");
    const sources = window.localStorage.getItem("sources");
    if (user && token) {
      const loggedUser = JSON.parse(user);
      dispatch(
        loginUser({ email: loggedUser.email, token: `bearer ${token}` })
      );
    }
    if (sources) {
      const parsedSources = JSON.parse(sources);
      dispatch(setSource({ sources: parsedSources }));
      dispatch(fetchSources());
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/news" element={<ProtectedRoute>
          <News></News>
        </ProtectedRoute>}>
        </Route>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
