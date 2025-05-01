// stores/authStore.js
import { defineStore } from 'pinia';
import apiClient from '@/api/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false, // NUEVO estado
  }),
  actions: {
    async checkAuth() {
      try {
        await apiClient.get('/auth/validate');
        this.authenticated = true;
      } catch (error) {
        this.authenticated = false;
      }
    },
    async logout() {
      await apiClient.post('/auth/logout');
      this.authenticated = false;
    }
  },
  getters: {
    isAuthenticated: (state) => state.authenticated
  }
});
