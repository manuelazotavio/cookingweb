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
import "../styles/Receita.css";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import receitaFoto from "../img/download.jpg";

const Receita = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { receita } = location.state || {};
  const { userId } = location.state || {};

  console.log(userId);

  const getFavoritoById = async () => {
    try {
      const response = await authFetch(
        `https://backcooking.onrender.com/favorito/${userId}/${receita.id}`
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
    getFavoritoById(userId, receita.id);
  }, []);

  const removeReceita = async () => {
    try {
      const result = await authFetch(
        `https://backcooking.onrender.com/receita/${receita.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!result.ok) {
        throw new Error(`HTTP error! status: ${result.status}`);
      }
      const data = await result.json();
      if (data?.success) {
        // Redirecionar ou atualizar a interface
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Error removeReceita " + error.message);
      alert(error.message);
    }
  };

  const favReceita = async () => {
    try {
      const result = await authFetch(
        "https://backcooking.onrender.com/favorito/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: Number(userId),
            receitaId: receita.id,
          }),
        }
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

  const favReceitaRemove = async () => {
    try {
      const result = await authFetch(
        "https://backcooking.onrender.com/favorito/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: Number(userId),
            receitaId: receita.id,
          }),
        }
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

  return (
    <div className="tela-receita-container">
      <div className="content-wrapper">
        <img src={receitaFoto} alt={receita.name} className="imagem-receita" />
        <div>
          <div className="card-tela-receita">
            <h2 className="titulo-receita-tela">{receita.name}</h2>
            <div className="info-container">
              <p>
                <FontAwesomeIcon icon={faClock} size="19" color="#FF421D" />
                <span className="tempo">{receita.tempo}</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faStar} color="#F7D342" size="23" />
                <span className="avaliacao">{receita.avaliacao}</span>
              </p>
              <p>
                <FontAwesomeIcon icon={faUser} color="#9EA69E" size="19" />
                <span className="porcoes">{receita.porcoes}</span>
              </p>
            </div>
            <p className="descricao">{receita.descricao}</p>
          </div>

          <div className="icon-container">
            <a className="icone" onClick={() => setModalVisible(true)}>
              <FontAwesomeIcon icon={faTrashCan} size={19} />
            </a>
            {isFavorited ? (
              <a className="icone" onClick={favReceitaRemove}>
                <FontAwesomeIcon icon={faHeart} size={19} color="#d31717" />
              </a>
            ) : (
              <a className="icone" onClick={favReceita}>
                <FontAwesomeIcon icon={faHeart} size={19} color="#000" />{" "}
              </a>
            )}
            <a
              className="icone"
              onClick={() =>
                navigate("/editar-receita", { state: { receita } })
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
        {receita.ingredientes.split(";").map((ingrediente, index) => (
          <p key={index}>{ingrediente}</p>
        ))}
      </div>
      <h3 className="subtitulo-receita">Passo a Passo</h3>
      <div className="instrucoes">
        {receita.instrucao.split(";").map((step, index) => (
          <p key={index}>
            <strong>{`${index + 1}. `}</strong>
            {step}
          </p>
        ))}
      </div>
      </div>
      {modalVisible && (
        <div className="modal">
          <p>Tem certeza?</p>
          <button onClick={removeReceita}>Sim, remover receita</button>
          <button onClick={() => setModalVisible(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Receita;
