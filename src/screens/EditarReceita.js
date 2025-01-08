import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import authFetch from "../helpers/authFetch.js";
import Button from "../components/Button.js";
import AdicionarBtn from "../components/AdicionarBtn.js";
import "../styles/EditarReceita.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faPencil,
  faTrashCan,
  faUser,
  faClock,

} from "@fortawesome/free-solid-svg-icons";
import isAuth from "../helpers/authOkay.js";
import { useNavigate } from "react-router-dom"; // Importando useNavigate

const EditarReceita = () => {
  const navigate = useNavigate(); // Usando useNavigate
  const location = useLocation();
  const { receita } = location.state || {};
  const [imagem, setImagem] = useState(receita.imagem);
  const [imagemPreview, setImagemPreview] = useState(receita.imagem);
  const isLogged = isAuth();
  if (isLogged === false) {
    navigate("/login");
  }

  const [txtName, setTxtName] = useState(receita.name);
  const [txtDescricao, setTxtDescricao] = useState(receita.descricao);
  const [txtPorcao, setTxtPorcao] = useState(receita.porcoes);
  const [txtTempo, setTxtTempo] = useState(receita.tempo);
  const [txtAvaliacao, setTxtAvaliacao] = useState(receita.avaliacao);
  const [ingredientes, setIngredientes] = useState(
    receita.ingredientes.split(";")
  );
  const [passos, setPassos] = useState(receita.instrucao.split(";"));

  const addIngrediente = () => {
    setIngredientes([...ingredientes, ""]);
  };

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    setImagem(file);
    setImagemPreview(URL.createObjectURL(file));

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

        const form = document.querySelector("#form-editar");
        const formData = new FormData(form);
  
      
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
  
    
  
      //const result = await authFetch('https://backend-api-express-1sem2024-rbd1.onrender.com/user/'+user.id, {
      const result = await authFetch(
        "https://backcooking.onrender.com/receita/" + receita.id,
        {
          method: "PUT",
          body: formData,
        },
        navigate
      );

      const data = await result.json();

      if (data?.success) {
        navigate("/home");
      }
    } catch (error) {
      console.log("Error edit " + error.message);
      alert(error.message);
      navigate("/home");
    }
  };

  return (
    <div className="container-editar-receita">
      <h1 className="titulo-criar">Crie sua receita!</h1>
      <form
        method="post"
        id="form-editar"
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
            className="input-file-editar-receita"
            onChange={handleImagemChange}
          ></input>

        <img className="img-preview" src={imagemPreview} alt="Avatar" />
        <FontAwesomeIcon className="pencil" icon={faPencil} size={22} />
        
        </div>
      </form>
      <Button
        title="Cancelar"
        onClick={() => navigate("/receita", { state: { receita } })}
      />{" "}
      {/* Usando navigate para voltar */}
      <Button title="Salvar" onClick={editReceita} />
    </div>
  );
};

export default EditarReceita;
