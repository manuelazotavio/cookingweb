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
        
        navigate("/Main");
      } else {
        const data = await response.json();
        if (response.status === 401) {
          setModalMessage("Usuário não encontrado.");
          setModalVisible(true);
        }
        if (response.status === 400) {
          let errorMessage = '';
          for (let field in data.fields) {
            errorMessage += data.fields[field].messages[0] + ' ';
          }
          setModalMessage(errorMessage.trim());
          setModalVisible(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="titulo">Entrar</h1>

      <input
        className="input"
        placeholder="Email..."
        onChange={(e) => setTxtEmail(e.target.value)}
        value={txtEmail}
      />
      <input
        className="input"
        placeholder="Senha..."
        onChange={(e) => setTxtPass(e.target.value)}
        value={txtPass}
        type="password"
      />

      <Button title="Entrar" onClick={handleLogin} />
      <div className="descricao">
        <span className="texto">Não possui um cadastro?</span>
      </div>
      <CadastrarBtn
        title="Cadastre-se"
        onClick={() => navigate("/Cadastrar")}
      />
  

      {/* <Modal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        contentLabel="Login Error"
      >
        <div className="modalView">
          <p className="modalText">{modalMessage}</p>
          <button onClick={() => setModalVisible(false)} className="buttonClose">
            Tentar novamente
          </button>
        </div>
      </Modal> */}
    </div>
  );
};

export default Login;
