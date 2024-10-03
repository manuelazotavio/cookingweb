import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Body.css'; // Importando estilos CSS
import H1 from './ui/H1';
import CardUser from './CardUser';
import '../styles/ContaBody.css'
import Button from './ui/Button';
import Header from './Header';
import Footer from './Footer';
import useUserStore from '../../stores/userStore';
import useUserLoggedStore from '../../stores/useUserLoggedStore';

const Body = () => {
  const navigate = useNavigate();
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const logout = useUserLoggedStore((state) => state.logout);

  const getUsers = async () => {
    try {
      const result = await fetch('https://backcooking.onrender.com/user');
      const data = await result.json();
      console.log(data.success);
      setUsers(data.users);
    } catch (error) {
      console.log('Error getUsers ' + error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleLogout = async () => {
    try {
      // Aqui você pode definir uma maneira de lidar com a remoção de informações do usuário no local storage
      logout();
      navigate('/login');
    } catch (error) {
      console.log(error);
      alert('Erro ao fazer logout!');
    }
  };

  return (
    <div style={{ flex: 1 }}>
      <div className="title-add">
        <H1 className="usuarios-h1">Users</H1>
        <Button title="Add User" onClick={() => navigate('/cadastrar')} />
        <Button title="Logout" onClick={handleLogout} />
      </div>

      <div className="list-user">
        {users.length ? (
          <div className="flat-list-user">
            {users.map((user) => (
              <CardUser key={user.id} user={user} />
            ))}
            <Header />
            <Footer />
          </div>
        ) : (
          <p style={{ color: '#FFF' }}>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Body;
