import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/Button.js";
import authFetch from "../helpers/authFetch.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import isAuth from "../helpers/authOkay.js";
import "../styles/EditarUser.css";
import { useNavigate } from "react-router-dom"; 

const EditUser = () => {
  const navigate = useNavigate();

  const isLogged = isAuth();
  if (isLogged === false) {
    navigate("/login");
  }

  const location = useLocation();
  const { userLogado } = location.state || {};

  const [txtName, setTxtName] = useState(userLogado.name);
  const [txtEmail, setTxtEmail] = useState(userLogado.email);
  const [avatar, setAvatar] = useState(userLogado.avatar);
  const [avatarPreview, setAvatarPreview] = useState(userLogado.avatar);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const editUser = async () => {
    try {
      const form = document.querySelector("#form-sign-in-user");
      const formData = new FormData(form);
      formData.append("name", txtName);
      formData.append("email", txtEmail);
      formData.append("avatar", avatar);

      const result = await authFetch(
        `https://backcooking.onrender.com/user/${userLogado.id}`,
        {
          method: "PUT",
          body: formData,
        },
        navigate
      );

      if (!result.ok) {
        const dataError = await result.json();
        if (dataError?.error && dataError?.code === "logout") {
          alert("Sessão expirada!");
          navigate("/login");
          return;
        }
      }

      const data = await result.json();
      if (data?.success) {
        localStorage.setItem("userLogged", JSON.stringify(data.user));
        navigate(-1);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Error edit " + error.message);
      alert(error.message);
    }
  };

  const removeUser = async () => {
    try {
      const result = await authFetch(
        `https://backcooking.onrender.com/user/${userLogado.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
        navigate
      );

      if (!result.ok) {
        const dataError = await result.json();
        if (dataError?.error && dataError?.code === "logout") {
          alert("Sessão expirada!");
          navigate("/login");
          return;
        }
      }

      const data = await result.json();
      if (data?.success) {
        localStorage.removeItem("userLogged");
        navigate("/account");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log("Error removeUser " + error.message);
      alert(error.message);
    }
  };

  return (
    <div className="edit-container">
      <h1 className="title">Editar usuário</h1>
      <form
        method="post"
        id="form-sign-in-user"
        className="form-create-user"
        encType="multipart/form-data"
      >
        <input
          className="input-edit-user"
          placeholder="Nome..."
          onChange={(e) => setTxtName(e.target.value)}
          value={txtName}
        />
        <input
          className="input-edit-user"
          placeholder="Email..."
          onChange={(e) => setTxtEmail(e.target.value)}
          value={txtEmail}
        />
        <div className="input-file-wrapper-edit">
          <input
            id="file-upload"
            accept="image/*"
            className="input-file-edit"
            type="file"
            onChange={handleAvatarChange}
          ></input>
          <img className="img-preview" src={avatarPreview} alt="Avatar" />
          <FontAwesomeIcon className="pencil" icon={faPencil} size={22} />
        </div>
      </form>

      <Button title="Salvar" onClick={editUser} className="button"></Button>
      <Button
        title="Excluir conta"
        onClick={removeUser}
        className="button"
      ></Button>
      <Button
        className="button"
        title="Voltar"
        onClick={() => navigate("/account")}
      ></Button>
    </div>
  );
};

export default EditUser;
