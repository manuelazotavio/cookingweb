import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import Swal from "sweetalert2";
import Button from "../components/Button.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"; 
import CadastrarBtn from "../components/CadastrarBtn.js";
import loading from "../img/loading.gif";
import "../styles/Login.css";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [txtEmail, setTxtEmail] = useState("");
  const [txtPass, setTxtPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://backcooking.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: txtEmail, pass: txtPass }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem(
          "userLogged",
          JSON.stringify({ ...data.user, token: data.token })
        );
        localStorage.setItem("username", data.user.name);
        localStorage.setItem("userId", data.user.id);

        navigate("/home");
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.log(errorData);

        Swal.fire({
          text: errorData.error,
          icon: "error",
          confirmButtonText: "Voltar",
          confirmButtonColor: "#ff421d",
        });
      }
    } catch (error) {
      setModalMessage("Erro ao fazer login. Tente novamente.");
      setModalVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="titulo">Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={txtEmail}
        onChange={(e) => setTxtEmail(e.target.value)}
      />
      <div className="password-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          value={txtPass}
          onChange={(e) => setTxtPass(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash} 
          className="eye-icon"
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        />
      </div>
      {isLoading ? (
        <img src={loading} alt="Carregando..." />
      ) : (
        <>
          <Button onClick={handleLogin} title="Entrar" />
          <CadastrarBtn
            onClick={() => navigate("/Cadastrar")}
            title="Cadastrar"
          />
          <a onClick={() => navigate("/esqueci-senha")} className="paragrafo">
            Esqueceu a senha?
          </a>
        </>
      )}
      <Modal
        isOpen={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <h2>{modalMessage}</h2>
        <button onClick={() => setModalVisible(false)}>Fechar</button>
      </Modal>
    </div>
  );
};

export default Login;
