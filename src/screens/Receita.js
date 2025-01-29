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
import receitaFoto from "../img/download.jpg";

const Receita = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const navigate = useNavigate();
  const isLogged = isAuth();
  if(isLogged === false) {
   navigate('/login')
  }
  const location = useLocation();
  const { receita } = location.state || {};
  const { userId } = location.state || {};

 
  const getFavoritoById = async () => {
    try {
      const response = await authFetch(
        `https://backcooking.onrender.com/favorito/${userId}/${receita.id}`
      , {}, navigate);
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
        },
        navigate
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
        }, navigate
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

  //Modal deletar receita
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
        removeReceita();
        console.log("Receita removida com sucesso.");
        navigate("/home");
      }
    });
  };

  return (
    <div className="tela-receita-container">
      <div className="content-wrapper">
        <img
          src={receita.imagem}
          alt={receita.name}
          className="imagem-receita"
        />
        <div>
          <div className="card-tela-receita">
            <h2 className="titulo-receita-tela">{receita.name}</h2>
            <div className="info-container">
              <p className="p-receita">
                <FontAwesomeIcon icon={faClock} size="19" color="#FF421D" />
                <span className="tempo">{receita.tempo}</span>
              </p>
              <p className="p-receita">
                <FontAwesomeIcon icon={faStar} color="#F7D342" size="23" />
                <span className="avaliacao">{receita.avaliacao}</span>
              </p>
              <p className="p-receita">
                <FontAwesomeIcon icon={faUser} color="#9EA69E" size="19" />
                <span className="porcoes">{receita.porcoes}</span>
              </p>
            </div>
            <p className="descricao">{receita.descricao}</p>
          </div>

          <div className="icon-container">
            <a className="icone" onClick={showModal}>
              <FontAwesomeIcon icon={faTrashCan} size={19} />
            </a>
            {isFavorited ? (
              <a className="icone" onClick={favReceitaRemove}>
                <FontAwesomeIcon icon={faHeart} size={19} color="#d31717" />
              </a>
            ) : (
              <a className="icone" onClick={favReceita}>
                <FontAwesomeIcon icon={faHeart} size={19} color="#8a8a8a" />{" "}
              </a>
            )}
            <a
              className="icone"
              onClick={() =>
                navigate("/editar-receita", { state: { receita, userId } })
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
            <p className="p-receita" key={index}>{ingrediente}</p>
          ))}
        </div>
        <h3 className="subtitulo-receita">Passo a Passo</h3>
        <div className="instrucoes">
          {receita.instrucao.split(";").map((step, index) => (
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
          <button onClick={removeReceita}>Sim, remover receita</button>
          <button onClick={() => setModalVisible(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default Receita;
