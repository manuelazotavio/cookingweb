import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserLoggedStore from '../stores/useUserLoggedStore.js';
import "../styles/Splash.css";  
import loading from '../img/logo.png'

const Splash = () => {
  const navigate = useNavigate(); 
  const login = useUserLoggedStore(state => state.login);

  useEffect(() => {
    const checkUserLogged = () => {
      try {
 
        const dataFound = localStorage.getItem('userLogged');
    
        if (dataFound) {
          const data = JSON.parse(dataFound);
   
          const { token } = data;
          delete data.token;
          login(data, token);
          setTimeout(() => {
            navigate('/home'); 
          }, 2000);
        } else {
          setTimeout(() => {
            navigate("/login")
          }, 2000);
        }
      } catch (error) {
        console.log('Erro ao ler dado', error);
      }
    };
    checkUserLogged();
  }, [navigate]); 

  return (
    <div className="container-splash">
      <img src={loading}/>
      <p>Carregando...</p>
    </div>
  );
};

export default Splash;
