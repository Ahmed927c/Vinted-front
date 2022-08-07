// Reste à faire`
// - preview picture avec state preview,setPreview URL.createObjectURL(event.target.files[0])

import React, { useState } from "react";
// import Login from "./Login";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Publish = () => {
  //navigation
  const navigate = useNavigate();

  //Load pictures
  const [picture, setPicture] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [etat, setEtat] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("city", city);
    formData.append("price", price);

    try {
      console.log("formData ==>", formData);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${Cookies.get("userToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      navigate("/");
      //     alert(JSON.stringify(response.data));
    } catch (error) {
      console.log("error ==>", error.message);
      console.log("error message ==>", error.response.data);
    }
  };

  return Cookies.get("userToken") ? (
    <div className="publish grey-box">
      <h2>Vends ton article</h2>
      <form onSubmit={handleSubmit}>
        <div className="publish__container">
          <label htmlFor="file" className="">
            + Ajouter une photo
          </label>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(event) => setPicture(event.target.files[0])}
          />
        </div>
        <div className="publish__container">
          <div className="publish__line">
            <label htmlFor="title">Titre</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="ex : Haut Tajine Banane"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="publish__line">
            <label htmlFor="description">Décris ton article</label>
            <input
              type="text"
              name="description"
              id="description"
              placeholder="ex : très bon état"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
        </div>
        <div className="publish__container">
          <div className="publish__line">
            <label htmlFor="brand">Marque</label>
            <input
              type="text"
              name="brand"
              id="brand"
              placeholder="ex: Tajine Banane"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
            />
          </div>
          <div className="publish__line">
            <label htmlFor="size">Taille</label>
            <input
              type="text"
              name="size"
              id="size"
              placeholder="ex: M / T38"
              value={size}
              onChange={(event) => setSize(event.target.value)}
            />
          </div>
          <div className="publish__line">
            <label htmlFor="color">Couleur</label>
            <input
              type="text"
              name="color"
              id="color"
              placeholder="ex: multicolore"
              value={color}
              onChange={(event) => setColor(event.target.value)}
            />
          </div>
          <div className="publish__line">
            <label htmlFor="size">Etat</label>
            <input
              type="text"
              name="etat"
              id="etat"
              placeholder="ex: très bon état"
              value={etat}
              onChange={(event) => setEtat(event.target.value)}
            />
          </div>
          <div className="publish__line">
            <label htmlFor="location">Lieu</label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="ex: Vannes"
              value={city}
              onChange={(event) => setCity(event.target.value)}
            />
          </div>
        </div>
        <div className="publish__container">
          <div className="publish__line">
            <label htmlFor="price">Prix</label>
            <input
              type="text"
              name="price"
              id="price"
              placeholder="ex : 0.00 €"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />
          </div>
        </div>
        <div className="align-right">
          <input type="submit" value="Ajouter" className="btn primary" />
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
