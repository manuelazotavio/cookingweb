import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cadastrar.css";
import Button from "../components/Button"; // Supondo que o botão esteja em um diretório 'components'

const Cadastrar = () => {
  const [modalMessage, setModalMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [txtName, setTxtName] = useState("");
  const [txtEmail, setTxtEmail] = useState("");
  const [txtAvatar, setTxtAvatar] = useState("");
  const [txtPass, setTxtPass] = useState("");
  const navigate = useNavigate();

  const postUser = async () => {
    try {
      const result = await fetch("https://backcooking.onrender.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: txtName,
          email: txtEmail,
          pass: txtPass,
          avatar: txtAvatar,
        }),
      });
      const data = await result.json();
      console.log(data);
      if (data?.success) {
        navigate(-1);
      } else {
        if (result.status === 400) {
          setModalMessage("Os campos são inválidos ou vazios.");
          setModalVisible(true);
        }
      }
    } catch (error) {
      console.log("Error postUser " + error.message);
      alert(error.message);
    }
  };

  return (
    <div className="cadastrar-container">
      <h1 className="titulo">Cadastrar</h1>
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
      <input
        type="password"
        className="input-cadastrar"
        placeholder="Senha..."
        onChange={(e) => setTxtPass(e.target.value)}
        value={txtPass}
      />
      <input
        className="input-cadastrar"
        placeholder="Avatar..."
        onChange={(e) => setTxtAvatar(e.target.value)}
        value={txtAvatar}
      />
      {/* Substituindo o botão padrão pelo componente Button */}
      <Button title="Cadastrar" onClick={postUser} className="button"></Button>
      <Button
        className="button"
        title="Voltar"
        onClick={() => navigate("/login")}
      ></Button>
      {/* {modalVisible && (
        <div className="centeredView">
          <div className="modalView">
            <p className="modalText">{modalMessage}</p>
            <Button
              className="buttonClose"
              onClick={() => setModalVisible(!modalVisible)}
            >
              Tentar novamente
            </Button>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Cadastrar;
