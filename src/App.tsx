import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { useAuth } from "./Auth/context/AuthProvider";
import { PrivateRoutes } from "./privateRoutes";
import "./App.scss";

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route element={<PrivateRoutes isLoggedIn={currentUser} />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/mis-listas" element={<></>}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
