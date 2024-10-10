import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button.js"; 
import '../styles/Conta.css';
import avatarFoto from '../img/user.png'

const Conta = () => {
  const [userLogado, setUserLogado] = useState(null);
  const navigate = useNavigate(); // Hook para navegação

  useEffect(() => {
    const fetchUser = () => {
      const userString = localStorage.getItem("userLogged");
      const user = JSON.parse(userString);
      setUserLogado(user);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("userLogged");
      navigate("/login"); // Navega para a página de login após logout
    } catch (error) {
      console.log(error);
      alert("Erro ao fazer logout!");
    }
  };

  return (
    <div className="container-conta">
      
        <div className="centered-container">
          <h1 className="titulo-conta">Sua conta</h1>

          <img className="profile-image" src={avatarFoto} alt="Avatar" />
          <p className="name"><b className="labelConta">Nome de usuário:</b> {userLogado?.name}</p>
          <p className="name"><b className="labelConta">E-mail:</b> {userLogado?.email}</p>
        </div>

        <Button style={{ alignSelf: "center" }} title="Editar" onClick={() => navigate("/editar-perfil")} />
        <Button style={{ alignSelf: "center" }} title="Sair" onClick={handleLogout} />
      
    </div>
  );
};

export default Conta;
