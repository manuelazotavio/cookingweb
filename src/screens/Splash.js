import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import loading from '../img/loading.gif'
import useUserLoggedStore from '../stores/useUserLoggedStore.js';
import "../styles/Splash.css";  // Certifique-se de ter um arquivo CSS para os estilos

const Splash = () => {
  const navigate = useNavigate(); // Usando useNavigate
  const login = useUserLoggedStore(state => state.login);

  useEffect(() => {
    const checkUserLogged = () => {
      try {
        console.log("entrei checkUserLogged")
        const dataFound = localStorage.getItem('userLogged');
        console.log('dataFound:', dataFound);
        if (dataFound) {
          const data = JSON.parse(dataFound);
          console.log('data:', data);
          const { token } = data;
          delete data.token;
          login(data, token);
          setTimeout(() => {
            navigate('/home'); // Usando navigate para redirecionar
          }, 2000);
        } else {
          setTimeout(() => {
            navigate('/login'); // Usando navigate para redirecionar
          }, 2000);
        }
      } catch (error) {
        console.log('Erro ao ler dado', error);
      }
    };
    checkUserLogged();
  }, []); 

  return (
    <div className="container-splash">
      <img src={loading} alt="Loading" />
    </div>
  );
};

export default Splash;
