import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'creator' | 'admin' | 'teacher' | 'student';
  universityId?: string;
  universityName?: string;
  classLevel?: string;
  semester?: 'I' | 'II';
  department?: string;
  isVerified: boolean;
  requires2FA: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<boolean>;
  creatorSignup: (userData: CreatorSignupData) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  isLoading: boolean;
}

interface SignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'teacher' | 'student';
  universityId: string;
  classLevel?: string;
  semester?: 'I' | 'II';
  department?: string;
}

interface CreatorSignupData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  secretKey: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = Cookies.get('bics_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        Cookies.remove('bics_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication logic
      const mockUser: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        role: email.includes('creator') ? 'creator' : 'student',
        universityId: email.includes('creator') ? undefined : '1',
        universityName: email.includes('creator') ? undefined : 'Semera University',
        classLevel: email.includes('creator') ? undefined : '2nd',
        semester: email.includes('creator') ? undefined : 'I',
        department: email.includes('creator') ? undefined : 'Computer Science',
        isVerified: true,
        requires2FA: false
      };
      
      setUser(mockUser);
      Cookies.set('bics_user', JSON.stringify(mockUser), { expires: 7 });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove('bics_user');
  };

  const signup = async (userData: SignupData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock signup logic
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        universityId: userData.universityId,
        universityName: 'Semera University', // This would come from the API
        classLevel: userData.classLevel,
        semester: userData.semester,
        department: userData.department,
        isVerified: false,
        requires2FA: false
      };
      
      setUser(newUser);
      Cookies.set('bics_user', JSON.stringify(newUser), { expires: 7 });
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const creatorSignup = async (userData: CreatorSignupData): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Validate secret key (in real app, this would be server-side)
      if (userData.secretKey !== 'BICS_CREATOR_2024') {
        return false;
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: 'creator',
        isVerified: true,
        requires2FA: true
      };
      
      setUser(newUser);
      Cookies.set('bics_user', JSON.stringify(newUser), { expires: 7 });
      return true;
    } catch (error) {
      console.error('Creator signup error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Forgot password error:', error);
      return false;
    }
  };

  const resetPassword = async (token: string, newPassword: string): Promise<boolean> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Reset password error:', error);
      return false;
    }
  };

  const value = {
    user,
    login,
    logout,
    signup,
    creatorSignup,
    forgotPassword,
    resetPassword,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}