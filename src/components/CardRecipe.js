import React from "react";
import "../styles/CardRecipe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useUserLoggedStore from "../stores/useUserLoggedStore.js";

const CardRecipe = ({ recipe }) => {
  const navigate = useNavigate();
  const userId = useUserLoggedStore((state) => state.id);

  return (
    <div
      className="card"
      onClick={() => navigate("/recipe", { state: { recipe, userId } })}
    >
      <img
        src={recipe.image}
        alt={recipe.name}
        className="img"
      />
      <h3 className="title-recipe">{recipe.name}</h3>
      <div className="info-container">
        <div className="info-item">
          <FontAwesomeIcon icon={faClock} size="19" color="#FF421D" />
          <span className="time-card">{recipe.time}</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faStar} color="#F7D342" size="23" />
          <span className="rating-card">{recipe.rating}</span>
        </div>
        <div className="info-item">
          <FontAwesomeIcon icon={faUser} color="#9EA69E" size="19" />
          <span className="portions-card">{recipe.portions}</span>
        </div>
      </div>
    </div>
  );
};

export default CardRecipe;
