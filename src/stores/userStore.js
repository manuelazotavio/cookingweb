import { create } from 'zustand';

const useUserStore = create((set) => ({
  users: JSON.parse(localStorage.getItem('users')) || [], 
  setUsers: (newUsers) => {
    set(() => ({ users: newUsers }));
    localStorage.setItem('users', JSON.stringify(newUsers));
  },
  addUser: (newUser) => set((state) => {
    const updatedUsers = [...state.users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Atualiza o localStorage
    return { users: updatedUsers };
  }),
  removeUser: (id) => set((state) => {
    const filteredUsers = state.users.filter((user) => user.id !== id);
    localStorage.setItem('users', JSON.stringify(filteredUsers)); // Atualiza o localStorage
    return { users: filteredUsers };
  }),
  updateUser: (newUser) => set((state) => {
    const updatedUsers = state.users.map((user) => 
      user.id === newUser.id ? newUser : user
    );
    localStorage.setItem('users', JSON.stringify(updatedUsers)); // Atualiza o localStorage
    return { users: updatedUsers };
  }),
}));

export default useUserStore;
