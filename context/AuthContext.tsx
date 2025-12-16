import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  avatar?: string;
  savedPropertyIds?: string[];
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  toggleSaveProperty: (propertyId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check local storage for persisted session
    const storedUser = localStorage.getItem('makan_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (userData: User) => {
    // Ensure savedPropertyIds exists
    const userWithSaved = { ...userData, savedPropertyIds: userData.savedPropertyIds || [] };
    setUser(userWithSaved);
    localStorage.setItem('makan_user', JSON.stringify(userWithSaved));
    closeLoginModal();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('makan_user');
    navigate('/');
  };

  const toggleSaveProperty = (propertyId: string) => {
    if (!user) {
      openLoginModal();
      return;
    }

    const currentSaved = user.savedPropertyIds || [];
    let newSaved: string[];

    if (currentSaved.includes(propertyId)) {
      newSaved = currentSaved.filter(id => id !== propertyId);
    } else {
      newSaved = [...currentSaved, propertyId];
    }

    const updatedUser = { ...user, savedPropertyIds: newSaved };
    setUser(updatedUser);
    localStorage.setItem('makan_user', JSON.stringify(updatedUser));
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
      toggleSaveProperty
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};