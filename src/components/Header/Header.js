import "./header.scss";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ token, setUser }) => {
  const navigate = useNavigate();
  return (
    <header className="header-component ">
      <p>My Header</p>
      {token === null ? (
        <>
          <Link to="/signup">S'inscrire</Link>
          <br />
          <Link to="/login">Se connecter</Link>{" "}
        </>
      ) : (
        <button
          onClick={() => {
            setUser(null);
            navigate("/");
          }}
        >
          Se déconnecter
        </button>
      )}

      <br />
    </header>
  );
};

export default Header;
