import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CriarReceita from "./screens/CriarReceita";
import Receita from "./screens/Receita";
import Cadastrar from "./screens/Cadastrar";
import EditarReceita from "./screens/EditarReceita";
import LandingPage from './screens/LandingPage'
import Splash from "./screens/Splash";
import Conta from "./screens/Conta";
import EditarUser from "./screens/EditarUser";
import Home from "./screens/Home";
import EsqueciSenha from './screens/EsqueciSenha.js'
import '@fontsource/poppins'; 
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/800.css';
import Login from "./screens/Login";
import { FiHome, FiPlusSquare, FiUser } from "react-icons/fi";
import Header from "./components/Header";



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
     <Header />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastrar" element={<Cadastrar />} />   
        <Route path="/home" element={<Home />} /> {/* Rota padrão para Home */}
        <Route path="/editar-user" element={<EditarUser />} />
        <Route path="/editar-receita" element={<EditarReceita />} />
        <Route path="/criar-receita" element={<CriarReceita />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/landing-page" element={<LandingPage />} />
        
        <Route path="/receita" element={<Receita />} />
        <Route path="/conta" element={<Conta />} />
        <Route path="/main" element={<MainNavigator />} />
      </Routes>
    </Router>
  );
}
