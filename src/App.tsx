import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { MyLists } from "./pages/MyLists";

import { useAuth } from "./Auth/context/AuthProvider";
import { PublicRoutes } from "./privateRoutes";
import { PrivateRoutes } from './privateRoutes';

import { Navbar } from "./ui/navbar";

import "./App.scss";

function App() {
  const { currentUser } = useAuth();
  return (
    <div className="container">
      <Navbar isAuth={currentUser ? true : false} />
      <div className="appMain">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route element={<PublicRoutes isLoggedIn={currentUser} />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>
          <Route path="/mis-listas" element={<MyLists />}></Route>
          <Route path="*" element={<Home/>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
