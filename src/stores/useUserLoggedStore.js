import { create } from 'zustand';

const useUserLoggedStore = create((set) => {
  const loadUser = () => {
    const user = JSON.parse(localStorage.getItem('userLogged'));
    return user || {
      id: null,
      nome: '',
      email: '',
      avatar: '',
      token: '',
      isLogged: false,
    };
  };

  const initialState = loadUser();

  return {
    ...initialState,
    
    login: (user, token) => {
      const loggedUser = { ...user, token, isLogged: true };
      set(() => loggedUser);
      localStorage.setItem('userLogged', JSON.stringify(loggedUser)); // Armazena no localStorage
    },
    
    logout: () => {
      set(() => ({
        id: null,
        nome: '',
        email: '',
        avatar: '',
        token: '',
        isLogged: false,
      }));
      localStorage.removeItem('userLogged'); // Remove do localStorage
    },
  };
});

export default useUserLoggedStore;