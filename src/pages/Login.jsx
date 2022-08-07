//To do :
// - useRef to close modal
// - don't close modal if click on modal
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, loginModal, setLoginModal, setSignupModal }) => {
  //Navigate to Home if API send back token
  const navigate = useNavigate();

  //Data to post
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Handle form infos
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          { email: email, password: password }
        );
        console.log("response ==>", response.data);
        if (response.data.searchedUser.token) {
          setUser(response.data.searchedUser.token);
          navigate("/");
        }
      } catch (error) {
        console.log("error ==>", error.message);
        console.log("error ==>", error.response);
        if (error.response.status === 400 || error.response.status === 401)
          setErrorMessage("Mauvais email/mot de passe");
      }
    };
    fetchData();
  };

  //Close modal
  // window.addEventListener("click", (event) => {
  //   if (loginModal && event.target.id !== "openLogin") setLoginModal(false);
  // });
  return (
    <div className="modal">
      <div className="signlog">
        <button
          className="close"
          onClick={() => {
            setLoginModal(false);
            document.body.style.overflow = "scroll";
          }}
        >
          &times;
        </button>
        <h2>Se connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={handlePassword}
          />
          <input
            type="submit"
            value="Se connecter"
            className="submit primary"
          />
          <span>{errorMessage}</span>
          <div
            className="message pointer"
            onClick={() => {
              setSignupModal(true);
              setLoginModal(false);
            }}
          >
            Pas encore de compte? Inscris-toi !
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;