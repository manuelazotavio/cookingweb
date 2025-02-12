import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button.js";
import "../styles/Account.css";
import isAuth from "../helpers/authOkay.js";

const Account = () => {
  const [userLogged, setUserLogged] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = () => {
      const userString = localStorage.getItem("userLogged");
      const user = JSON.parse(userString);
      setUserLogged(user);
    };

    const isLogged = isAuth();
    if (isLogged === false) {
      navigate("/login");
    }

    fetchUser();
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("userLogged");
      navigate("/login");
      window.location.reload(); 
    } catch (error) {
      console.log(error);
      alert("Erro ao fazer logout!");
    }
  };

  return (
    <div className="container-account">
      <div className="centered-container">
        <h1 className="titulo-account">Sua conta</h1>
        <img
          className="profile-image-account"
          src={userLogged?.avatar}
          alt="Avatar"
        />
        <p className="name">
          <b className="labelAccount">Nome de usuário:</b> {userLogged?.name}
        </p>
        <p className="name">
          <b className="labelAccount">E-mail:</b> {userLogged?.email}
        </p>
      </div>

      <Button
        style={{ alignSelf: "center" }}
        title="Editar"
        onClick={() => navigate("/edit-user", { state: { userLogged } })}
      />
      <Button
        style={{ alignSelf: "center" }}
        title="Sair"
        onClick={handleLogout}
      />
    </div>
  );
};

export default Account;
