import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '@fontsource/poppins'; 
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/800.css';
import { FiHome, FiPlusSquare, FiUser } from "react-icons/fi";
import Header from "./components/Header";
import Dashboard from "./screens/Dashboard.js";
import SignIn from "./screens/SignIn.js";
import Login from "./screens/Login.js";
import Home from "./screens/Home.js";
import Account from "./screens/Account.js";
import CreateRecipe from "./screens/CreateRecipe.js";



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
            <Link to="/account">
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
        <Route path="/sign-in" element={<SignIn />} />   
        <Route path="/home" element={<Home />} /> 
        <Route path="/edit-user" element={<EditarUser />} />
        <Route path="/edit-recipe" element={<EditarReceita />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<EsqueciSenha />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/valid-token" element={<ValidToken />} />
        
        <Route path="/recipe" element={<Receita />} />
        <Route path="/account" element={<Account />} />
        <Route path="/main" element={<MainNavigator />} />
      </Routes>
      <Footer />
    </Router>
  );
}
