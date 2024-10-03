import React, { useState } from "react";
import { useLocation } from "react-router-dom"; 
import authFetch from "../helpers/authFetch.js";
import Button from "../components/Button.js";
import AdicionarBtn from "../components/AdicionarBtn.js";
import "../styles/EditarReceita.css"; 
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

const EditarReceita = () => {
  const navigate = useNavigate(); // Usando useNavigate
  const location = useLocation();
  const { receita } = location.state; 

  const [txtName, setTxtName] = useState(receita.name);
  const [txtDescricao, setTxtDescricao] = useState(receita.descricao);
  const [txtPorcao, setTxtPorcao] = useState(receita.porcoes);
  const [txtTempo, setTxtTempo] = useState(receita.tempo);
  const [txtAvaliacao, setTxtAvaliacao] = useState(receita.avaliacao);
  const [ingredientes, setIngredientes] = useState(receita.ingredientes.split(";"));
  const [passos, setPassos] = useState(receita.instrucao.split(";"));

  const addIngrediente = () => {
    setIngredientes([...ingredientes, ""]);
  };

  const addPasso = () => {
    setPassos([...passos, ""]);
  };

  const handleIngredienteChange = (text, index) => {
    const newIngredientes = [...ingredientes];
    newIngredientes[index] = text;
    setIngredientes(newIngredientes);
  };

  const handlePassoChange = (text, index) => {
    const newPassos = [...passos];
    newPassos[index] = text;
    setPassos(newPassos);
  };

  const editReceita = async () => {
    try {
      const result = await authFetch(
        `https://backcooking.onrender.com/receita/${receita.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: txtName,
            descricao: txtDescricao,
            porcoes: txtPorcao,
            tempo: txtTempo,
            avaliacao: txtAvaliacao,
            ingredientes: ingredientes.filter((ingrediente) => ingrediente !== "").join(";"),
            instrucao: passos.filter((passo) => passo !== "").join(";"),
          }),
        }
      );
      const data = await result.json();
      if (data?.success) {
        navigate(-1); // Usando navigate para voltar à página anterior
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Error edit " + error.message);
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h1>Edite sua receita!</h1>
      <form className="form">
        <input
          className="input"
          placeholder="Título da Receita"
          onChange={(e) => setTxtName(e.target.value)}
          value={txtName}
        />
        <textarea
          className="inputDesc"
          placeholder="Compartilhe um pouco mais sobre o seu prato. O que você gosta nele?"
          onChange={(e) => setTxtDescricao(e.target.value)}
          value={txtDescricao}
        />

        <h2>Ingredientes</h2>
        {ingredientes.map((ingrediente, index) => (
          <input
            key={index}
            className="input"
            placeholder="250g de açúcar"
            onChange={(e) => handleIngredienteChange(e.target.value, index)}
            value={ingrediente}
          />
        ))}
        <AdicionarBtn title="Ingrediente" onClick={addIngrediente} />

        <h2>Passo a passo</h2>
        {passos.map((passo, index) => (
          <div key={index} className="passoContainer">
            <span className="passoNumero">{index + 1}.</span>
            <input
              className="inputPasso"
              placeholder="Misture a massa até se tornar homogênea."
              onChange={(e) => handlePassoChange(e.target.value, index)}
              value={passo}
            />
          </div>
        ))}
        <AdicionarBtn title="Passo" onClick={addPasso} />

        <label>Porções</label>
        <input
          className="input"
          placeholder="2 pessoas"
          onChange={(e) => setTxtPorcao(e.target.value)}
          value={txtPorcao}
        />
        <label>Tempo de preparo</label>
        <input
          className="input"
          placeholder="1h e 30min"
          onChange={(e) => setTxtTempo(e.target.value)}
          value={txtTempo}
        />

        <label>Avaliação</label>
        <input
          className="input"
          placeholder="4.5"
          onChange={(e) => setTxtAvaliacao(e.target.value)}
          value={txtAvaliacao}
        />

        <div className="buttonGroup">
          <Button title="Cancelar" onClick={() => navigate(-1)} /> {/* Usando navigate para voltar */}
          <Button title="Salvar" onClick={editReceita} />
        </div>
      </form>
    </div>
  );
};

export default EditarReceita;