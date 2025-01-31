import React, { useState, useRef } from "react";
import authFetch from "../helpers/authFetch.js";
import { useNavigate } from "react-router-dom"; // Para navegação
import "../styles/CriarReceita.css";
import AdicionarBtn from "../components/AdicionarBtn.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faPencil,
  faTrashCan,
  faUser,
  faClock,

} from "@fortawesome/free-solid-svg-icons";
import useUserLoggedStore from "../stores/useUserLoggedStore.js";
import Button from "../components/Button.js";
import isAuth from "../helpers/authOkay.js";
import { useEffect } from "react";

const CriarReceita = () => {
  const navigate = useNavigate();
 useEffect(() => {
  const isLogged = isAuth();
  if (isLogged === false) {
    navigate("/login");
  }
 }, [])

  const [imagem, setImagem] = useState("");

  const [txtName, setTxtName] = useState("");
  const [txtDescricao, setTxtDescricao] = useState("");
  const [txtPorcao, setTxtPorcao] = useState("");
  const [txtTempo, setTxtTempo] = useState("");
  const [txtAvaliacao, setTxtAvaliacao] = useState("");
  const [ingredientes, setIngredientes] = useState([""]);
  const [passos, setPassos] = useState([""]);

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    setImagem(file);
  };

  const userId = useUserLoggedStore((state) => state.id);

  const postReceita = async () => {
    try {
      const form = document.querySelector("#form-cadastrar");
      const formData = new FormData(form);

      formData.append("userId", userId);
      formData.append("name", txtName);
      formData.append("descricao", txtDescricao);
      formData.append("porcoes", txtPorcao);
      formData.append("tempo", txtTempo);
      formData.append("avaliacao", txtAvaliacao);
      formData.append("imagem", imagem);
      formData.append(
        "ingredientes",
        ingredientes.filter((ingrediente) => ingrediente !== "").join(";")
      );

      formData.append(
        "instrucao",
        passos.filter((passo) => passo !== "").join(";")
      );

  

      const result = await authFetch(
        "https://backcooking.onrender.com/receita",

        {
          method: "POST",
          body: formData, // Envia o FormData diretamente
        },
        navigate
      );

      const text = await result.text();
      console.log("Status: ", result.status);
      console.log("Resposta do servidor: ", text);

      if (result.ok) {
        console.log("Receita publicada!");
        navigate("/home");
      } else {
        alert(`Erro: ${text}`);
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
    <div className="container-editar-receita">
      <h1 className="titulo-criar">Crie sua receita!</h1>

      <form
        method="post"
        id="form-cadastrar"
        className="form-criar-receita"
        encType="multipart/form-data"
      >
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
        <div className="input-file-wrapper">
          <input
            id="file-upload"
            accept="image/*"
            required
            type="file"
            className="input-file"
            onChange={handleImagemChange}
          ></input>
          {imagem ? (
            <img
              className="img-preview"
              src={URL.createObjectURL(imagem)}
              alt="Imagem da receita"
            />
          
        
            
          ) : (
            <label htmlFor="file" className="input-file-label">
              Escolha uma foto para sua receita!
            </label>
          )}
        </div>
      </form>

      <Button title={"Publicar"} onClick={postReceita} />
    </div>
  );
};

export default CriarReceita;
