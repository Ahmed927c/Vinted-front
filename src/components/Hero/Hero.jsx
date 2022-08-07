import React from "react";
import hero from "../../assets/hero.png";
import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <div className="hero">
      <img src={hero} alt="" />
      <div className="hero__container">
        <p>Prêts à faire du tri dans vos placards ?</p>
        <Link to={"/publish"}>
          <button className="primary">Vends maintenant</button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;