// context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define User interface
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  user: null
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Properly type the user state
  const [user, setUser] = useState<User | null>(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    // In a real app, check local storage, cookies, or session
    const token = localStorage.getItem('waocard_auth_token');
    
    if (token) {
      setIsAuthenticated(true);
      // Now TypeScript knows this object structure is valid for the user state
      setUser({
        id: '123',
        name: 'Demo User',
        email: 'user@example.com',
        avatar: '/avatars/demo-user.png'
      });
    }
  }, []);

  const login = () => {
    // This is a simplified demo login
    // In a real app, you would redirect to a login page or open a login modal
    const confirmed = window.confirm("This is a demo login. In a real app, this would show a login form. Continue with demo login?");
    
    if (confirmed) {
      // Set demo token
      localStorage.setItem('waocard_auth_token', 'demo-token-123');
      setIsAuthenticated(true);
      setUser({
        id: '123',
        name: 'Demo User',
        email: 'user@example.com',
        avatar: '/avatars/demo-user.png'
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('waocard_auth_token');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);