import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';
import logo from '../img/logo.png'

const Header = () => {
 
  const [burger_class, setBurgerClass] = useState("burguer-bar unclicked")
  const [menu_class, setMenuClass] = useState("menu hidden");
  const [isMenuClicked, setIsMenuClicked] = useState(false)

  const updateMenu = () => {
    if(!isMenuClicked) {
      setBurgerClass("burger-bar clicked")
      setMenuClass("menu visible")
    } else {
      setBurgerClass("burger-bar unclicked")
      setMenuClass("menu hidden")
    }
    setIsMenuClicked(!isMenuClicked)
  }
 
  return (
    <div className="header">
    
       
        <Link className='tituloHeader'>CookingWeb</Link>
        <img className='logo' src={logo}></img>
      
     
      <nav>
       
        <ul className="nav-list"> 
          <div className='burger-menu'  onClick={updateMenu}>
          <div className={burger_class}></div>
          <div className={burger_class} ></div>
          <div className={burger_class}></div>
        </div>
          <li className="nav-item">
            <Link to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/criar-receita">Criar Receita</Link>
          </li>
          <li className="nav-item">
            <Link to="/conta">Conta</Link>
          </li>
          
        </ul>
      </nav>
      <div className={menu_class}></div>
    </div>
  );
};

export default Header;