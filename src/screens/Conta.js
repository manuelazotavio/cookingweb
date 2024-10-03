import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button.js"; 
import '../styles/Conta.css';

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
    <div className="container">
      <div className="bg">
        <div className="centered-container">
          <h1 className="titulo">Sua conta</h1>

          <img className="profile-image" src="/path/to/profile-image.jpg" alt="Avatar" />
          <p className="name"><b>Nome de usuário:</b> {userLogado?.name}</p>
          <p className="name"><b>E-mail:</b> {userLogado?.email}</p>
        </div>

        <Button style={{ alignSelf: "center" }} title="Editar" onClick={() => navigate("/editar-perfil")} />
        <Button style={{ alignSelf: "center" }} title="Sair" onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Conta;
