import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const NomodalSignup = ({ setUser }) => {
  //Navigate to Home if API send back token
  const navigate = useNavigate();

  // Data to post
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  //Handle form infos
  const handleName = (event) => setUsername(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);
  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          { username, email, password }
        );
        console.log("response ==>", response);
        if (response.data.token) {
          setUser(response.data.token);
          navigate("/");
        }
      } catch (error) {
        console.log("error ==>", error.message);
        if (error.response.status === 409)
          setErrorMessage("cet email est déjà utilisé");
      }
    };
    fetchData();
  };
  return (
    <div className="signlog nomodal" id="signModal">
      <h2>S'inscrire</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={handleName}
        />
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
        <span>{errorMessage}</span>
        <div className="input-checkbox">
          <input type="checkbox" name="newsletter" id="newsletter" />
          <label>S'inscrire à notre newsletter</label>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <input type="submit" value="S'inscrire" className="submit primary" />

        <Link to="/login">
          <div className="message pointer">
            Tu as déjà un compte ? Connecte-toi !
          </div>
        </Link>
      </form>
    </div>
  );
};

export default NomodalSignup;
