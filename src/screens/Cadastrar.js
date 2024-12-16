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

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const postUser = async () => {
    try {
      const form = document.querySelector("#form-cadastrar-user");
      const formData = new FormData(form);
      formData.append("name", txtName);
      formData.append("email", txtEmail);
      formData.append("pass", txtPass);
      formData.append("avatar", avatar);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }
      const result = await fetch("https://backcooking.onrender.com/user",  {
        method: "POST",
        body: formData,
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
    <div className="cadastrar-container">
      <h1 className="titulo">Cadastrar</h1>
      <form
        method="post"
        id="form-cadastrar-user"
        className="form-criar-user"
        encType="multipart/form-data"
      >
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
        /><div className="input-file-wrapper">
        <input
          id="file-upload"
          accept="image/*"
          required
          className="input-file"
          type="file"
          onChange={handleAvatarChange}
        ></input>
       
        {avatar ? (
          <img className="img-preview" src={URL.createObjectURL(avatar)} alt="Avatar" />
        ) :  <label htmlFor="file" className="input-file-label">
            Escolha um avatar para seu perfil.
          </label>}
        </div>
      </form>

      
          
          
        

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
