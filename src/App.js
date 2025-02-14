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
import EditRecipe from "./screens/EditRecipe.js";
import EditUser from "./screens/EditUser.js";
import ForgotPassword from "./screens/ForgotPassword.js";
import Recipe from "./screens/Recipe.js";
import ValidToken from "./screens/ValidToken.js";
import Splash from "./screens/Splash.js";
import LandingPage from "./screens/LandingPage.js";
import Footer from "./components/Footer.js";



const MainNavigator = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/recipe">
              <FiHome size={25} color="#000" />
            </Link>
          </li>
          <li>
            <Link to="/create-recipe">
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
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/edit-recipe" element={<EditRecipe />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/valid-token" element={<ValidToken />} />
        
        <Route path="/recipe" element={<Recipe />} />
        <Route path="/account" element={<Account />} />
        <Route path="/main" element={<MainNavigator />} />
      </Routes>
      <Footer />
    </Router>
  );
}
