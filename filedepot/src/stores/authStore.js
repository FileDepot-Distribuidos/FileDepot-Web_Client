// import { defineStore } from 'pinia';

// export const useAuthStore = defineStore('auth', {
//   state: () => ({
//     token: localStorage.getItem('token') || null, // Cargar token desde localStorage si existe
//   }),
//   actions: {
//     setToken(token) {
//       this.token = token;
//       localStorage.setItem('token', token); // Guardar token en localStorage
//     },
//     logout() {
//       this.token = null;
//       localStorage.removeItem('token'); // Eliminar token de localStorage
//     }
//   },
//   getters: {
//     isAuthenticated: (state) => !!state.token, // Devuelve true si hay un token
//   }
// });
