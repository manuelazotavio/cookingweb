import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/Cadastrar.css';

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
    <div className="container">
      <h1 className="titulo">Cadastrar</h1>
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
          type="password"
          className="input"
          placeholder="Senha..."
          onChange={(e) => setTxtPass(e.target.value)}
          value={txtPass}
        />
        <input
          className="input"
          placeholder="Avatar..."
          onChange={(e) => setTxtAvatar(e.target.value)}
          value={txtAvatar}
        />
        <button onClick={postUser} className="button">
          Cadastrar
        </button>
        <button className="button" onClick={() => console.log("Voltar para Login")}>
          Voltar
        </button>
      </div>
      {modalVisible && (
        <div className="centeredView">
          <div className="modalView">
            <p className="modalText">{modalMessage}</p>
            <button
              className="buttonClose"
              onClick={() => setModalVisible(!modalVisible)}
            >
              Tentar novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cadastrar;
