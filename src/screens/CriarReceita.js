import React, { useState } from "react";
import authFetch from "../helpers/authFetch.js";
import { useNavigate } from "react-router-dom"; // Para navegação
import "../styles/CriarReceita.css";
import AdicionarBtn from "../components/AdicionarBtn.js";
import useUserLoggedStore from "../stores/useUserLoggedStore.js";
import Button from "../components/Button.js";

const CriarReceita = () => {
  const [imagem, setImagem] = useState("");

  const [txtName, setTxtName] = useState("");
  const [txtDescricao, setTxtDescricao] = useState("");
  const [txtPorcao, setTxtPorcao] = useState("");
  const [txtTempo, setTxtTempo] = useState("");
  const [txtAvaliacao, setTxtAvaliacao] = useState("");
  const [ingredientes, setIngredientes] = useState([""]);
  const [passos, setPassos] = useState([""]);

  const userId = useUserLoggedStore((state) => state.id);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagem(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const postReceita = async () => {
    try {
      console.log("meu userID é" + userId);
      const result = await authFetch(
        "https://backcooking.onrender.com/receita",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            name: txtName,
            descricao: txtDescricao,
            porcoes: txtPorcao,
            tempo: txtTempo,
            avaliacao: parseInt(txtAvaliacao),
            ingredientes: ingredientes
              .filter((ingrediente) => ingrediente !== "")
              .join(";"),
            instrucao: passos.filter((passo) => passo !== "").join(";"),
          }),
        }
      );
      const data = await result.json();
      if (data?.success) {
        console.log("Receita publicada!");
        navigate("/home");
      }
    } catch (error) {
      console.log("estou no catch");
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
    <div className="container-editar-receita">
      <h1 className="titulo-criar">Crie sua receita!</h1>
      <div className="form-criar-receita">
        <input
          className="input-criar"
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

        <h2 className="subtitulo-criar">Ingredientes</h2>
        {ingredientes.map((ingrediente, index) => (
          <input
            key={index}
            className="input-criar"
            type="text"
            placeholder="250g de açúcar"
            onChange={(e) => handleIngredienteChange(e.target.value, index)}
            value={ingrediente}
          />
        ))}

        <AdicionarBtn
          title={"Adicionar Ingrediente"}
          onClick={addIngrediente}
        />

        <h2 className="subtitulo-criar">Passo a passo</h2>
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

        <AdicionarBtn title={"Adicionar Passo"} onClick={addPasso} />

        <label>Porções</label>
        <input
          className="input-criar"
          type="text"
          placeholder="2 pessoas"
          onChange={(e) => setTxtPorcao(e.target.value)}
          value={txtPorcao}
        />

        <label>Tempo de preparo</label>
        <input
          className="input-criar"
          type="text"
          placeholder="1h e 30min"
          onChange={(e) => setTxtTempo(e.target.value)}
          value={txtTempo}
        />

        <label>Avaliação</label>
        <input
          className="input-criar"
          type="text"
          placeholder="4.5"
          onChange={(e) => setTxtAvaliacao(e.target.value)}
          value={txtAvaliacao}
        />
        <label className="label">Escolha uma imagem para sua receita.</label>
<div className="custom-file-upload">
  <input 
    type="file" 
    onChange={handleImageChange} 
    id="file-upload"
    style={{ display: 'none' }} // Esconde o input original
  />
  <label htmlFor="file-upload" className="custom-file-label">
    Selecionar Imagem
  </label>
  {imagem && (
    <div className="image-preview">
      <img src={imagem} alt="Prévia da receita" className="preview-img" />
      <span className="file-name">Imagem selecionada</span>
    </div>
  )}
</div>

        <Button title={"Publicar"} onClick={postReceita} />
      </div>
    </div>
  );
};

export default CriarReceita;
