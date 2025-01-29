import React, { useEffect, useState, useCallback } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import loading from "../img/loading.gif";
import "../styles/EsqueciSenha.css";
import Button from "../components/Button";

const EsqueciSenha = () => {
  const [txtEmail, setTxtEmail] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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
      if (response.ok) {
        
        
                Swal.fire({
                  text: "E-mail enviado com sucesso.",
                  icon: "success",
                  confirmButtonText: "Ok",
                  confirmButtonColor: "#ff421d",
                });
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
      {isLoading ? (
        <img src={loading} />
      ) : (
        <>
          <Button title="Enviar" onClick={handleEnviarEmail} />
          <Button title="Voltar" onClick={() => navigate("/login")} />
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

export default EsqueciSenha;
