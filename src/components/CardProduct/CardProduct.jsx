import React from "react";
import profilePic from "../../assets/profilePic.svg";

const CardProduct = ({ item }) => {
  return (
    <div className="card">
      {item.owner ? (
        <div className="card__user">
          <div className="card__user--img">
            {item.owner.account.avatar ? (
              <img
                src={item.owner.account.avatar.secure_url}
                alt="profile avatar"
              />
            ) : (
              <img src={profilePic} alt="default profile" />
            )}
          </div>
          <div className="grey">{item.owner.account.username}</div>
        </div>
      ) : (
        ""
      )}

      <div className="card__img">
        <img
          src={item.product_image.secure_url}
          alt={item.product_description}
        />
      </div>
      <div className="card__details">
        <div className="card__price">{item.product_price} €</div>
        {item.product_details.map((item, index) => {
     
          return (
            <div className="infos--details--line" key={index}>
             
              <span className="grey">{Object.values(item)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CardProduct;
