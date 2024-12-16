import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Button from "../components/Button.js";
import authFetch from "../helpers/authFetch";
import isAuth from "../helpers/authOkay.js";
import "../styles/EditarUser.css";
import { useNavigate } from "react-router-dom"; // Importando useNavigate

const EditarUser = () => {
  const navigate = useNavigate();
   
    const isLogged = isAuth();
  if(isLogged === false) {
   navigate('/login')
  }
  // Usando useNavigate
  const location = useLocation();
  const { userLogado } = location.state || {};

 

  const [txtName, setTxtName] = useState(userLogado.name);
  const [txtEmail, setTxtEmail] = useState(userLogado.email);
  const [avatar, setAvatar] = useState(userLogado.avatar);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const editUser = async () => {
    try {
      const form = document.querySelector("#form-cadastrar-user");
      const formData = new FormData(form);
      formData.append("name", txtName);
      formData.append("email", txtEmail);
      formData.append("avatar", avatar);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      const result = await authFetch(`https://backcooking.onrender.com/user/${userLogado.id}`,  {
        method: "PUT",
        body: formData,
      }, navigate);

      if (!result.ok) {
        const dataError = await result.json();
        if (dataError?.error && dataError?.code === "logout") {
          alert("Sessão expirada!");
          navigate("/login"); // Usando navigate para redirecionar
          return;
        }
      }

      const data = await result.json();
      if (data?.success) {
        localStorage.setItem("userLogged", JSON.stringify(data.user)); // Usando localStorage
        navigate(-1); // Usando navigate para voltar
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
          navigate("/login"); // Usando navigate para redirecionar
          return;
        }
      }

      const data = await result.json();
      if (data?.success) {
        localStorage.removeItem("userLogged"); // Remove o usuário do localStorage
        navigate("/conta"); // Usando navigate para redirecionar
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
      <h1 className="titulo">Editar usuário</h1>
      <form
        method="post"
        id="form-cadastrar-user"
        className="form-criar-user"
        encType="multipart/form-data"
      >
        <input
          className="input-cadastrar"
          placeholder="Nome..."
          onChange={(e) => setTxtName(e.target.value)}
          value={txtName}
        />
        <input
          className="input-cadastrar"
          placeholder="Email..."
          onChange={(e) => setTxtEmail(e.target.value)}
          value={txtEmail}
        />
        <div className="input-file-wrapper-edit">
        <input
          id="file-upload"
          accept="image/*"
          required
          className="input-file-edit"
          type="file"
          onChange={handleAvatarChange}
        ></input>
        <img className="img-preview" src={avatar} alt="Avatar" />
        
        </div>
        <p>Clique na imagem para alterá-la.</p>
      </form>

      
          
          
        

      <Button title="Salvar" onClick={editUser} className="button"></Button>
      <Button title="Excluir conta" onClick={removeUser} className="button"></Button>
      <Button
        className="button"
        title="Voltar"
        onClick={() => navigate("/conta")}
      ></Button>
    </div>
  );
};

export default EditarUser;
