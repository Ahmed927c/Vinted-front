//Offer page
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import CardOffer from "../components/CardOffer/CardOffer";

const Offer = () => {
  //Select specific data
  const { id } = useParams();

  //Import Data
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  // Fetch data from Vinted API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
          
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("error of ===>", error.message);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <span>En cours de chargement...</span>
      ) : (
        <CardOffer data={data} />
      )}
    </div>
  );
};

export default Offer;
