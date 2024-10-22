import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Cadastrar.css";
import Button from "../components/Button"; // Supondo que o botão esteja em um diretório 'components'

const Cadastrar = () => {
  const [avatar, setAvatar] = useState("");
  const [txtName, setTxtName] = useState("");
  const [txtEmail, setTxtEmail] = useState("");
  const [txtPass, setTxtPass] = useState("");
  const navigate = useNavigate();


  const postUser = async () => {
    try {
      console.log(avatar)
      const result = await fetch("https://backcooking.onrender.com/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: txtName,
          email: txtEmail,
          pass: txtPass,
          avatar,
        }),
      });
      const data = await result.json();
      console.log(data);
      if (data?.success) {
        navigate(-1);
      }
    } catch (error) {
      console.log("Error postUser " + error.message);
      alert(error.message);
    }
  };

  return (
    <div className="loginContainer">
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
  
     <label htmlFor="avatar" className="custom-file-label">Escolha uma imagem para seu perfil.</label>
    
        <input
          type="file"
          onChange={(e) => setAvatar(e.target.value)}
          id="file-upload"
          style={{ display: "none" }} 
          required
        />
            <input type="file" onChange={(e) => setAvatar(e.target.value)}>
          
          </input>
        {avatar && (
          <div className="image-preview">
            <img src={avatar} alt="Prévia do avatar" className="preview-img" />
            <span className="file-name">Imagem selecionada</span>
          </div>
        )}
    

      <Button title="Cadastrar" onClick={postUser} className="button"></Button>
      <Button
        className="button"
        title="Voltar"
        onClick={() => navigate("/login")}
      ></Button>
     
    </div>
  );
};

export default Cadastrar;
