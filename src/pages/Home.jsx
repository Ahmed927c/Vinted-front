import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import CardProduct from "../components/CardProduct/CardProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Home = ({ params }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  // Fetch data from Vinted API
  useEffect(() => {
    const fetchData = async () => {
      console.log(params);
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers",
          // ,
          {
            params: {
              title: params.product_name,
              priceMin: params.priceMin,
              priceMax: params.priceMax,
              sort: params.sort,
              limit: 8,
              page: page,
            },
          }
        );
        console.log("response data ===>", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error ===>", error.message);
      }
    };
    fetchData(params);
  }, [params, page]);
  return (
    <div>
      <Hero />
      {isLoading ? (
        <span>En cours de chargement...</span>
      ) : (
        <div className="home">
          <div className="offers">
            {data.offers.map((item) => {
              return (
                <div key={item._id}>
                  <Link to={`/offer/${item._id}`}>
                    <CardProduct item={item} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="pages">
            {page === 1 ? (
              <div className="page white">
                <FontAwesomeIcon icon={faAngleLeft} />
              </div>
            ) : (
              <button
                className="btn primary"
                onClick={() => page >= 2 && setPage(page - 1)}
              >
                Previous
              </button>
            )}

            <div className="page">{page}</div>
            {page === Math.ceil(data.count / 8) ? (
              <div className="page white">
                <FontAwesomeIcon icon={faAngleRight} />
              </div>
            ) : (
              <button
                className="btn primary"
                onClick={() => page <= data.count / 8 && setPage(page + 1)}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
