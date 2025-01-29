import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../styles/EsqueciSenha.css";
import Button from "../components/Button";

const EsqueciSenha = () => {
  const [txtEmail, setTxtEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleEnviarEmail = async () => {
    try {
      setIsLoading(true);
      const email = txtEmail; // Obtém o e-mail digitado pelo usuário
      const response = await fetch(
        "https://backcooking.onrender.com/auth/redefinir-senha",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }), // Envia como JSON
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Verifique seu e-mail");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Erro ao enviar e-mail.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="esqueciContainer">
      <h1 className="titulo">Esqueceu a senha?</h1>
      <input
        type="email"
        placeholder="E-mail"
        className="input"
        value={txtEmail}
        onChange={(e) => setTxtEmail(e.target.value)}
      />
      <p className="esqueci-senha-p">
        Um e-mail será enviado para sua caixa de entrada. Verifique os spams.
      </p>

      <>
        <Button title="Enviar" onClick={handleEnviarEmail} />
        <Button title="Voltar" onClick={() => navigate("/login")} />
      </>
    </div>
  );
};

export default EsqueciSenha;
