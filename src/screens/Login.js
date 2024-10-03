import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para navegação
import Modal from "react-modal"; 
import Button from "../components/Button.js"; // Verifique se está adaptado para React
import CadastrarBtn from "../components/CadastrarBtn.js"; // Verifique se está adaptado para React
import "../styles/Login.css";  // Crie um arquivo CSS separado para estilos

const Login = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [txtEmail, setTxtEmail] = useState("");
  const [txtPass, setTxtPass] = useState("");
  
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://backcooking.onrender.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: txtEmail, pass: txtPass }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userLogged", JSON.stringify({ ...data.user, token: data.token })); // Usando localStorage
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("userId", data.user.id);
        navigate("/home"); // Redireciona para a página inicial após o login
      } else {
        const errorData = await response.json();
        setModalMessage(errorData.message);
        setModalVisible(true);
      }
    } catch (error) {
      setModalMessage("Erro ao fazer login. Tente novamente.");
      setModalVisible(true);
    }
  };

  const handleCadastrar = () => {
    navigate("/cadastrar"); // Redireciona para a página de cadastro
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={txtEmail}
        onChange={(e) => setTxtEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={txtPass}
        onChange={(e) => setTxtPass(e.target.value)}
      />
      <Button onClick={handleLogin} title="Login" />
      <CadastrarBtn onClick={handleCadastrar} title="Cadastrar" />
      {/* <Modal isOpen={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <h2>{modalMessage}</h2>
        <button onClick={() => setModalVisible(false)}>Fechar</button>
      </Modal> */}
    </div>
  );
};

export default Login;