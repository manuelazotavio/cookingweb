import React, { useState } from "react";
import '../styles/CriarReceita.css';

const CriarReceita = () => {
  const [txtName, setTxtName] = useState("");
  const [txtDescricao, setTxtDescricao] = useState("");
  const [txtPorcao, setTxtPorcao] = useState("");
  const [txtTempo, setTxtTempo] = useState("");
  const [txtAvaliacao, setTxtAvaliacao] = useState("");
  const [ingredientes, setIngredientes] = useState([""]);
  const [passos, setPassos] = useState([""]);

  const postReceita = async () => {
    try {
      const result = await fetch("https://backcooking.onrender.com/receita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: txtName,
          descricao: txtDescricao,
          porcoes: txtPorcao,
          tempo: txtTempo,
          avaliacao: Number(txtAvaliacao),
          ingredientes: ingredientes.filter(ingrediente => ingrediente !== "").join(";"),
          instrucao: passos.filter(passo => passo !== "").join(";"),
        }),
      });
      const data = await result.json();
      if (data?.success) {
        console.log("Receita publicada!");
      } else {
        console.log("Erro ao publicar.");
      }
    } catch (error) {
      console.error("Error postReceita: " + error.message);
      alert(error.message);
    }
  };

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

  return (
    <div className="container">
      <h1 className="titulo">Crie sua receita!</h1>
      <div className="form">
        <input
          className="input"
          type="text"
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
        
        <h2 className="subtitulo">Ingredientes</h2>
        {ingredientes.map((ingrediente, index) => (
          <input
            key={index}
            className="input"
            type="text"
            placeholder="250g de açúcar"
            onChange={(e) => handleIngredienteChange(e.target.value, index)}
            value={ingrediente}
          />
        ))}
        <button className="adicionarBtn" onClick={addIngrediente}>Adicionar Ingrediente</button>

        <h2 className="subtitulo">Passo a passo</h2>
        {passos.map((passo, index) => (
          <div key={index} className="passoContainer">
            <span className="passoNumero">{index + 1}.</span>
            <textarea
              className="inputPasso"
              placeholder="Misture a massa até se tornar homogênea."
              onChange={(e) => handlePassoChange(e.target.value, index)}
              value={passo}
            />
          </div>
        ))}
        <button className="adicionarBtn" onClick={addPasso}>Adicionar Passo</button>

        <label>Porções</label>
        <input
          className="input"
          type="text"
          placeholder="2 pessoas"
          onChange={(e) => setTxtPorcao(e.target.value)}
          value={txtPorcao}
        />
        
        <label>Tempo de preparo</label>
        <input
          className="input"
          type="text"
          placeholder="1h e 30min"
          onChange={(e) => setTxtTempo(e.target.value)}
          value={txtTempo}
        />

        <label>Avaliação</label>
        <input
          className="input"
          type="text"
          placeholder="4.5"
          onChange={(e) => setTxtAvaliacao(e.target.value)}
          value={txtAvaliacao}
        />

        <button className="button" onClick={postReceita}>Publicar</button>
      </div>
    </div>
  );
};

export default CriarReceita;
