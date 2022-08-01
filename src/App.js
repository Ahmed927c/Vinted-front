import { useState } from "react";
import "./App.scss";
import Cookies from "js-cookie";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

//components
import Header from "./components/Header/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);

  const setUser = (tokenToCheck) => {
    if (tokenToCheck !== null) {
      //Action de connexion
      console.log("Création d'un cookie userToken");
      Cookies.set("userToken", tokenToCheck, { expires: 10 });
    } else {
      //action de déconnexion
      console.log("Suppression d'un cookie userTOken");
      Cookies.remove("userToken");
    }
    setToken(tokenToCheck);
  };

  //connexion / inscription
  // setUser("387D3G3UYGUY3GUEGUYZEGGYUGUYGUYGUYGD");

  //déconnexion
  // setUser(null)

  return (
    <div className="container">
      <Router>
        <Header token={token} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer/:offerId" element={<Offer />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
