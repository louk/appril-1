import { create } from 'zustand';
interface User {
  name: string;
  email: string;
  avatarUrl: string;
}
interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
}
const mockUser: User = {
  name: "Alex Doe",
  email: "alex.doe@example.com",
  avatarUrl: "https://i.pravatar.cc/150?u=alexdoe",
};
export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: () => set({ isAuthenticated: true, user: mockUser }),
  logout: () => set({ isAuthenticated: false, user: null }),
}));