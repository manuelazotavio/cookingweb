import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SignIn.css";
import loading from "../img/loading.gif";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [txtName, setTxtName] = useState("");
  const [txtEmail, setTxtEmail] = useState("");
  const [txtPass, setTxtPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const postUser = async () => {
    try {
      setIsLoading(true);
      const form = document.querySelector("#form-sign-in-user");
      const formData = new FormData(form);
      formData.append("name", txtName);
      formData.append("email", txtEmail);
      formData.append("pass", txtPass);
      formData.append("avatar", avatar);

      const result = await fetch("https://backcooking.onrender.com/user", {
        method: "POST",
        body: formData,
      });
      const data = await result.json();
      console.log(data);
      if (data?.success) {
        navigate(-1);
      } else {
        let errorMessage = "";
        for (let field in data.fields) {
          errorMessage += data.fields[field].messages[0] + " ";
        }
        Swal.fire({
          text: errorMessage,
          icon: "error",
          confirmButtonText: "Voltar",
          confirmButtonColor: "#ff421d",
        });
      }
    } catch (error) {
      console.log("Error postUser " + error.message);
      Swal.fire({
        text: error.message,
        icon: "error",
        confirmButtonText: "Voltar",
        confirmButtonColor: "#ff421d",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <h1 className="title">Cadastrar</h1>
      <form
        method="post"
        id="form-sign-in-user"
        className="form-sign-in"
        encType="multipart/form-data"
      >
        <input
          className="input-sign-in"
          placeholder="Nome..."
          onChange={(e) => setTxtName(e.target.value)}
          value={txtName}
        />
        <input
          className="input-sign-in"
          placeholder="Email..."
          onChange={(e) => setTxtEmail(e.target.value)}
          value={txtEmail}
        />
        <div className="password-container-cadastrar">
          <input
            className="input-sign-in"
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={txtPass}
            onChange={(e) => setTxtPass(e.target.value)}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="eye-icon"
            onClick={togglePasswordVisibility}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="input-file-wrapper">
          <input
            id="file-upload"
            accept="image/*"
            required
            className="input-file"
            type="file"
            onChange={handleAvatarChange}
          ></input>

          {avatar ? (
            <>
              <img
                className="img-preview"
                src={URL.createObjectURL(avatar)}
                alt="Avatar"
              />
              <FontAwesomeIcon className="pencil" icon={faPencil} size={22} />
            </>
          ) : (
            <label htmlFor="file" className="input-file-label">
              Escolha um avatar para seu perfil.
            </label>
          )}
        </div>
      </form>

      {isLoading ? (
        <img src={loading} />
      ) : (
        <>
          <Button
            title="Cadastrar"
            onClick={postUser}
            className="button"
          ></Button>
          <Button
            className="button"
            title="Voltar"
            onClick={() => navigate("/login")}
          ></Button>
        </>
      )}
    </div>
  );
};

export default SignIn;
