import React, { useState } from "react";
import authFetch from "../helpers/authFetch.js";
import { useNavigate } from "react-router-dom";
import "../styles/CriarReceita.css";
import AddBtn from "../components/AddBtn.js";
import useUserLoggedStore from "../stores/useUserLoggedStore.js";
import Button from "../components/Button.js";
import isAuth from "../helpers/authOkay.js";
import { useEffect } from "react";

const CreateRecipe = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogged = isAuth();
    if (isLogged === false) {
      navigate("/login");
    }
  }, []);

  const [image, setImage] = useState("");
  const [txtName, setTxtName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [txtDescription, setTxtDescription] = useState("");
  const [txtPortion, setTxtPortion] = useState("");
  const [txtTime, setTxtTime] = useState("");
  const [txtRating, setTxtRating] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const handleIngredientChange = (text, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = text;
    setIngredients(newIngredients);
  };

  const handleInstructionChange = (text, index) => {
    const newInstructions = [...instructions];
    newInstructions[index] = text;
    setInstructions(newInstructions);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const userId = useUserLoggedStore((state) => state.id);

  const postRecipe = async () => {
    try {
      setIsLoading(true);
      const form = document.querySelector("#form-sign-in");
      const formData = new FormData(form);
      formData.append("userId", userId);
      formData.append("name", txtName);
      formData.append("description", txtDescription);
      formData.append("portions", txtPortion);
      formData.append("time", txtTime);
      formData.append("rating", txtRating);
      formData.append("image", image);
      formData.append(
        "ingredients",
        ingredients.filter((ingredient) => ingredient !== "").join(";")
      );

      formData.append(
        "instruction",
        instructions.filter((instruction) => instruction !== "").join(";")
      );

      const result = await authFetch(
        "https://backcooking.onrender.com/recipe",

        {
          method: "POST",
          body: formData,
        },
        navigate
      );

      const text = await result.text();
      console.log("Status: ", result.status);
      console.log("Resposta do servidor: ", text);

      if (result.status === 401) {
        navigate("/login");
      }
      if (result.ok) {
        console.log("Receita publicada!");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error postReceita: " + error.message);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-edit-recipe">
      <h1 className="title-create">Crie sua receita!</h1>

      <form
        method="post"
        id="form-sign-in"
        className="form-create-recipe"
        encType="multipart/form-data"
      >
        <input
          className="input-create"
          type="text"
          placeholder="Título da Receita"
          onChange={(e) => setTxtName(e.target.value)}
          value={txtName}
        />
        <textarea
          className="input-desc"
          placeholder="Compartilhe um pouco mais sobre o seu prato. O que você gosta nele?"
          onChange={(e) => setTxtDescription(e.target.value)}
          value={txtDescription}
        />

        <h2 className="subtitle-create">Ingredientes</h2>
        {ingredients.map((ingredient, index) => (
          <input
            key={index}
            className="input-create"
            type="text"
            placeholder="250g de açúcar"
            onChange={(e) => handleIngredientChange(e.target.value, index)}
            value={ingredient}
          />
        ))}

        <AddBtn title={"Adicionar Ingrediente"} onClick={addIngredient} />

        <h2 className="subtitle-create">Passo a passo</h2>
        {instructions.map((instruction, index) => (
          <div key={index} className="instructionContainer">
            <span className="instructionNumber">{index + 1}.</span>
            <textarea
              className="inputInstruction"
              placeholder="Misture a massa até se tornar homogênea."
              onChange={(e) => handleInstructionChange(e.target.value, index)}
              value={instruction}
            />
          </div>
        ))}

        <AddBtn title={"Adicionar Passo"} onClick={addInstruction} />

        <label className="label-create-recipe">Porções</label>
        <input
          className="input-create"
          type="text"
          placeholder="2 pessoas"
          onChange={(e) => setTxtPortion(e.target.value)}
          value={txtPortion}
        />

        <label className="label-create-recipe">Tempo de preparo</label>
        <input
          className="input-create"
          type="text"
          placeholder="1h e 30min"
          onChange={(e) => setTxtTime(e.target.value)}
          value={txtTime}
        />

        <label className="label-create-recipe">Avaliação</label>
        <input
          className="input-create"
          type="text"
          placeholder="4.5"
          onChange={(e) => setTxtRating(e.target.value)}
          value={txtRating}
        />

        <div className="input-file-wrapper">
          <input
            id="file-upload"
            accept="image/*"
            required
            type="file"
            className="input-file"
            onChange={handleImageChange}
          ></input>

          {image ? (
            <img
              className="img-preview"
              src={URL.createObjectURL(image)}
              alt="Imagem da receita"
            />
          ) : (
            <label htmlFor="file" className="input-file-label">
              Escolha uma foto para sua receita!
            </label>
          )}
        </div>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <Button title={"Publicar"} onClick={postRecipe} />
        )}
      </form>
    </div>
  );
};

export default CreateRecipe;
