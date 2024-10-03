import React, { useState } from "react";
import { useLocation } from "react-router-dom"; 
import Button from "../components/Button.js"; 
import authFetch from "../helpers/authFetch";
import "../styles/EditarUser.css"; 
import { useNavigate } from 'react-router-dom'; // Importando useNavigate

const EditarUser = () => {
  const navigate = useNavigate(); // Usando useNavigate
  const location = useLocation();
  const { userLogado } = location.state; // Obtendo dados do usuário

  const [txtName, setTxtName] = useState(userLogado.name);
  const [txtEmail, setTxtEmail] = useState(userLogado.email);
  const [txtAvatar, setTxtAvatar] = useState(userLogado.avatar);

  const editUser = async () => {
    try {
      const result = await authFetch(
        `https://backcooking.onrender.com/user/${userLogado.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: txtName,
            email: txtEmail,
            avatar: txtAvatar,
          }),
        }
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
        localStorage.setItem('userLogged', JSON.stringify(data.user)); // Usando localStorage
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
      const result = await authFetch(`https://backcooking.onrender.com/user/${userLogado.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!result.ok) {
        const dataError = await result.json();
        if (dataError?.error && dataError?.code === "logout") {
          alert('Sessão expirada!');
          navigate('/login'); // Usando navigate para redirecionar
          return;
        }
      }

      const data = await result.json();
      if (data?.success) {
        localStorage.removeItem('userLogged'); // Remove o usuário do localStorage
        navigate('/splash'); // Usando navigate para redirecionar
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.log('Error removeUser ' + error.message);
      alert(error.message);
    }
  };

  return (
    <div style={{ backgroundColor: "#fff", width: "100%", flex: 1 }}>
      <div className="container">
        <h1 className="titulo">Editar</h1>
        <div className="form">
          <input
            className="input"
            placeholder="Nome..."
            onChange={(e) => setTxtName(e.target.value)}
            value={txtName}
          />
          <input
            className="input"
            placeholder="Email..."
            onChange={(e) => setTxtEmail(e.target.value)}
            value={txtEmail}
          />
          <input
            className="input"
            placeholder="Avatar..."
            onChange={(e) => setTxtAvatar(e.target.value)}
            value={txtAvatar}
          />
        </div>
      </div>
      <div className="buttonGroup">
        <Button title="Cancelar" onClick={() => navigate("/conta")} />
        <Button title="Salvar" onClick={editUser} />
        <Button title="Apagar conta" onClick={removeUser} />
      </div>
    </div>
  );
};

export default EditarUser;
