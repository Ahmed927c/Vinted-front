import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");

  const handleSignup = async (event) => {
    try {
      event.preventDefault();

      //Je viens reset le message d'erreur à chaque tentative
      setErrorMessage("");

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      if (response.data) {
        console.log("J'ai bien réussi à créer un compte");
        setUser(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        setErrorMessage("Cet email a déjà un compte ! ");
      }
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Your Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <br />

        <input
          type="checkbox"
          placeholder="test"
          value={newsletter}
          onChange={(event) => setNewsletter(event.target.checked)}
        />
        <span>S'inscire à la newsletter</span>
        <br />
        <input type="submit" value="S'inscrire" />
        <p style={{ color: "red" }}>{errorMessage}</p>
      </form>
    </div>
  );
};

export default Signup;
