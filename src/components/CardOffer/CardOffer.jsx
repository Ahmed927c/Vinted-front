import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
// import Home from "../pages/Home";
import profilePic from "../../assets/profilePic.svg";

const CardOffer = ({ data, setLoginModal }) => {
  return (
    <div className="offer">
      {console.log("offer data ==>", data)}
      <div className="offer__img">
        <img src={data.product_image.secure_url} alt={data.product_name} />
      </div>
      <div className="offer__infos">
        <div className="infos--price">{data.product_price} €</div>
        <div className="infos--details">
          {data.product_details.map((item, index) => {
            return (
              <div className="infos--details--line" key={index}>
                <span className="grey">{Object.keys(item)}</span>
                <span className="darkgrey">{Object.values(item)}</span>
              </div>
            );
          })}
        </div>

        <div className="offer__block">
          <div className="block--name">{data.product_name}</div>
          <div className="grey">{data.product_description}</div>
          <div className="block--user">
            {data.owner.account.avatar ? (
              <img src={data.owner.account.avatar.secure_url} alt="avatar" />
            ) : (
              <img src={profilePic} alt="default profile" />
            )}

            <div className="user--name">{data.owner.account.username}</div>
          </div>
        </div>
        {Cookies.get("userToken") ? (
          <Link
            to={`/payment`}
            state={{ title: data.product_name, price: data.product_price }}
          >
            <button className="primary">Acheter</button>
          </Link>
        ) : (
          <Link to={`/login`}>
            <button className="primary">Acheter</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CardOffer;
