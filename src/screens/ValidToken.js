import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loading from "../img/loading.gif";
import Button from "../components/Button.js";
import "../styles/ValidToken.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import SignBtn from "../components/SignBtn.js";

const ValidToken = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleValidToken = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://backcooking.onrender.com/auth/verify-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Senha redefinida com sucesso!");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Erro ao redefinir a senha.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <h1 className="titulo">Escolha sua nova senha</h1>
      <div className="password-container">
        <input
          className="input"
          type={showPassword ? "text" : "password"}
          placeholder="Nova senha"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          className="eye-icon"
          onClick={togglePasswordVisibility}
          style={{ cursor: "pointer" }}
        />
      </div>
      {isLoading ? (
        <img alt="Carregando..." src={loading}></img>
      ) : (
        <>
          <SignBtn onClick={handleValidToken} title="Redefinir senha" />
          <Button onClick={() => navigate("/Login")} title="Voltar" />
        </>
      )}
    </div>
  );
};

export default ValidToken;
