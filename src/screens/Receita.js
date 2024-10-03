import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faHeart, faPencil, faTrashCan, faUser, faClock } from "@fortawesome/free-solid-svg-icons";
import authFetch from "../helpers/authFetch"; // Certifique-se de que este helper funcione em um ambiente de web.
import "../styles/Receita.css"; // Importando estilos de um arquivo CSS separado

const Receita = ({ receita, userId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const getFavoritoById = async () => {
    try {
      const response = await authFetch(`https://backcooking.onrender.com/favorito/${userId}/${receita.id}`);
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
    getFavoritoById();
  }, [userId, receita.id]);

  const removeReceita = async () => {
    try {
      const result = await authFetch(`https://backcooking.onrender.com/receita/${receita.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
      const result = await authFetch("https://backcooking.onrender.com/favorito/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Number(userId),
          receitaId: receita.id,
        }),
      });
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
      const result = await authFetch("https://backcooking.onrender.com/favorito/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: Number(userId),
          receitaId: receita.id,
        }),
      });
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
    <div className="receita-container">
      <img src="https://fakeimg.pl/600x400" alt="Receita" className="foto-img" />
      <div className="icon-container">
        <button onClick={() => setModalVisible(true)}>Remover</button>
        {isFavorited ? (
          <button onClick={favReceitaRemove} style={{ color: "#d31717" }}>Desfavoritar</button>
        ) : (
          <button onClick={favReceita}>Favoritar</button>
        )}
        <button onClick={() => {/* Navegação para Editar Receita */}}>Editar</button>
      </div>
      <h2 className="titulo">{receita.name}</h2>
      <div className="info-container">
        <p><FontAwesomeIcon icon={faClock} /> {receita.tempo}</p>
        <p><FontAwesomeIcon icon={faStar} /> {receita.avaliacao}</p>
        <p><FontAwesomeIcon icon={faUser} /> {receita.porcoes}</p>
      </div>
      <p className="descricao">{receita.descricao}</p>
      <h3 className="subtitulo">Ingredientes</h3>
      <div className="ingredientes">
        {receita.ingredientes.split(";").map((ingrediente, index) => (
          <p key={index}>{ingrediente}</p>
        ))}
      </div>
      <h3 className="subtitulo">Passo a Passo</h3>
      <div className="instrucoes">
        {receita.instrucao.split(";").map((step, index) => (
          <p key={index}>
            <strong>{`${index + 1}. `}</strong>
            {step}
          </p>
        ))}
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
