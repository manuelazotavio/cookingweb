import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faPencil,
  faTrashCan,
  faUser,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import authFetch from "../helpers/authFetch";
import isAuth from "../helpers/authOkay";
import "../styles/Receita.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Recipe = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const isLogged = isAuth();
  if (isLogged === false) {
    navigate("/login");
  }
  const location = useLocation();
  const { recipe } = location.state || {};
  const { userId } = location.state || {};

  const getFavoriteById = async () => {
    try {
      const response = await authFetch(
        `https://backcooking.onrender.com/favorite/${userId}/${recipe.id}`,
        {},
        navigate
      );
      const data = await response.json();
      if (data.error) {
        console.log(data.error);
        return;
      }
      setIsFavorited(true);
    } catch (error) {
      console.error(`Error in getFavoritoById: ${error.message}`);
    }
  };

  useEffect(() => {
    getFavoriteById(userId, recipe.id);
  }, []);

  const removeRecipe = async () => {
    try {
      const result = await authFetch(
        `https://backcooking.onrender.com/recipe/${recipe.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
        navigate
      );
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      if (data?.success) {
        navigate("/home")
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Error removeReceita " + error.message);
      alert(error.message);
    }
  };

  const favRecipe = async () => {
    try {
      const result = await authFetch(
        "https://backcooking.onrender.com/favorite/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: Number(userId),
            recipeId: recipe.id,
          }),
        },
        navigate
      );
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      if (data?.success) {
        setIsFavorited(true);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Error favReceita " + error.message);
      alert(error.message);
    }
  };

  const favRecipeRemove = async () => {
    try {
      const result = await authFetch(
        "https://backcooking.onrender.com/favorite/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: Number(userId),
            recipeId: recipe.id,
          }),
        },
        navigate
      );
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      if (data?.success) {
        setIsFavorited(false);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Error favReceita " + error.message);
      alert(error.message);
    }
  };

  const showModal = () => {
    Swal.fire({
      text: "Tem certeza que deseja excluir sua receita?",
      icon: "warning",
      confirmButtonText: "Sim",
      showCancelButton: true,
      cancelButtonText: "Voltar",
      confirmButtonColor: "#ff421d",
    }).then((result) => {
      if (result.isConfirmed) {
        removeRecipe();
        console.log("Receita removida com sucesso.");
        navigate("/home");
      }
    });
  };

  return (
    <div className="tela-receita-container">
      <div className="content-wrapper">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="imagem-receita"
        />
        <div>
          <div className="card-tela-receita">
            <h2 className="titulo-receita-tela">{recipe.name}</h2>
            <div className="info-container-receita">
              <p className="p-receita">
                <FontAwesomeIcon icon={faClock} size="19" color="#FF421D" />
                <span className="tempo">{recipe.time}</span>
              </p>
              <p className="p-receita">
                <FontAwesomeIcon icon={faStar} color="#F7D342" size="23" />
                <span className="avaliacao">{recipe.rating}</span>
              </p>
              <p className="p-receita">
                <FontAwesomeIcon icon={faUser} color="#9EA69E" size="19" />
                <span className="porcoes">{recipe.portions}</span>
              </p>
            </div>
            <p className="descricao">{recipe.description}</p>
          </div>

          <div className="icon-container">
            <a className="icone" onClick={showModal}>
              <FontAwesomeIcon icon={faTrashCan} size={19} />
            </a>
            {isFavorited ? (
              <a className="icone" onClick={favRecipeRemove}>
                <FontAwesomeIcon icon={faHeart} size={19} color="#d31717" />
              </a>
            ) : (
              <a className="icone" onClick={favRecipe}>
                <FontAwesomeIcon icon={faHeart} size={19} color="#8a8a8a" />{" "}
              </a>
            )}
            <a
              className="icone"
              onClick={() =>
                navigate("/edit-recipe", { state: { recipe, userId } })
              }
            >
              <FontAwesomeIcon icon={faPencil} size={19} />
            </a>
          </div>
        </div>
      </div>
      <div className="card-info">
        <h3 className="subtitulo-receita">Ingredientes</h3>
        <div className="ingredientes">
          {recipe.ingredients.split(";").map((ingredient, index) => (
            <p className="p-receita" key={index}>
              {ingredient}
            </p>
          ))}
        </div>
        <h3 className="subtitulo-receita">Passo a Passo</h3>
        <div className="instrucoes">
          {recipe.instruction.split(";").map((step, index) => (
            <p className="p-receita" key={index}>
              <strong>{`${index + 1}. `}</strong>
              {step}
            </p>
          ))}
        </div>
      </div>
      {modalVisible && (
        <div className="modal">
          <p className="p-receita">Tem certeza?</p>
          <button onClick={removeRecipe}>Sim, remover receita</button>
          <button onClick={() => setModalVisible(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Recipe;
