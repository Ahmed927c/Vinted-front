import { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

//https://lereacteur-vinted-api.herokuapp.com/offers

const Home = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const fetchOffers = async () => {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      };
      fetchOffers();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  return isLoading === true ? (
    <div>En cours de chargement</div>
  ) : (
    <div>
      {data.offers.map((offer) => {
        // console.log(offer._id);
        return (
          <Link to={`/offer/${offer._id}`}>
            <div>
              <h2>{offer.product_name}</h2>
              <img
                style={{ height: "150px" }}
                src={offer.product_image.secure_url}
                alt=""
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Home;
