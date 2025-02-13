import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import authFetch from "../helpers/authFetch.js";
import Button from "../components/Button.js";
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
import { useNavigate } from "react-router-dom"; 
import AddBtn from "../components/AddBtn.js";

const EditRecipe = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { recipe } = location.state || {};
  const [image, setImage] = useState(recipe.image);
  const [imagePreview, setImagePreview] = useState(recipe.image);
  const isLogged = isAuth();
  if (isLogged === false) {
    navigate("/login");
  }

  const [txtName, setTxtName] = useState(receita.name);
  const [txtDescription, setTxtDescription] = useState(recipe.description);
  const [txtPortion, setTxtPortion] = useState(recipe.portions);
  const [txtTime, setTxtTime] = useState(recipe.time);
  const [txtRating, setTxtRating] = useState(recipe.rating);
  const [ingredients, setIngredients] = useState(recipe.ingredients.split(";"));
  const [instructions, setInstructions] = useState(
    recipe.instruction.split(";")
  );s

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
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

  const editRecipe = async () => {
    try {
      const form = document.querySelector("#form-edit");
      const formData = new FormData(form);

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

      //const result = await authFetch('https://backend-api-express-1sem2024-rbd1.onrender.com/user/'+user.id, {
      const result = await authFetch(
        "https://backcooking.onrender.com/recipe/" + recipe.id,
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
    <div className="container-edit-recipe">
      <h1 className="title-create">Crie sua receita!</h1>
      <form
        method="post"
        id="form-edit"
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

        <label>Porções</label>
        <input
          className="input-create"
          type="text"
          placeholder="2 pessoas"
          onChange={(e) => setTxtPortion(e.target.value)}
          value={txtPortion}
        />

        <label>Tempo de preparo</label>
        <input
          className="input-create"
          type="text"
          placeholder="1h e 30min"
          onChange={(e) => setTxtTime(e.target.value)}
          value={txtTime}
        />

        <label>Avaliação</label>
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
            type="file"
            className="input-file-edit-recipe"
            onChange={handleImageChange}
          ></input>

          <img className="img-preview" src={imagePreview} alt="Avatar" />
          <FontAwesomeIcon className="pencil" icon={faPencil} size={22} />
        </div>
      </form>
      <Button
        title="Cancelar"
        onClick={() => navigate("/recipe", { state: { recipe } })}
      />

      <Button title="Salvar" onClick={editRecipe} />
    </div>
  );
};

export default EditRecipe;
