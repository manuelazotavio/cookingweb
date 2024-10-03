import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CriarReceita from "./screens/CriarReceita";
import Receita from "./screens/Receita";
import Cadastrar from "./screens/Cadastrar";
import EditarReceita from "./screens/EditarReceita";
import Splash from "./screens/Splash";
import Conta from "./screens/Conta";
import EditarUser from "./screens/EditarUser";
import Home from "./screens/Home";
import Login from "./screens/Login";
import { FiHome, FiPlusSquare, FiUser } from "react-icons/fi";

const ReceitaNavigator = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/receita" element={<Receita />} />
    </Routes>
  );
};

const MainNavigator = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/receita">
              <FiHome size={25} color="#000" />
            </Link>
          </li>
          <li>
            <Link to="/criar-receita">
              <FiPlusSquare size={24} color="black" />
            </Link>
          </li>
          <li>
            <Link to="/conta">
              <FiUser size={24} color="black" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />
        <Route path="/editar-user" element={<EditarUser />} />
        <Route path="/editar-receita" element={<EditarReceita />} />
        <Route path="/home" element={<Home />} /> {/* Rota padrão para Home */}
        <Route path="/receita" element={<ReceitaNavigator />} />
        <Route path="/criar-receita" element={<CriarReceita />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/main" element={<MainNavigator />} />
      </Routes>
    </Router>
  );
}
