import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { User } from "@shared/schema";
import { apiRequest } from "../lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Define a simpler shape for our auth context 
type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, fullName: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
};

// Create initial default context
const defaultContextValue: AuthContextType = {
  user: null,
  isLoading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
};

// Create a context
export const AuthContext = createContext<AuthContextType>(defaultContextValue);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check for current user session on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await fetch('/api/user', {
          credentials: 'include'
        });
        
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (err) {
        console.error('Failed to fetch user:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        toast({
          title: "Login successful",
          description: `Welcome back, ${userData.fullName}!`,
        });
      } else {
        const errorData = await response.text();
        setError(errorData || 'Login failed');
        toast({
          title: "Login failed",
          description: errorData || "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError('Failed to connect to the server');
      toast({
        title: "Login failed",
        description: "Failed to connect to the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (username: string, password: string, fullName: string, role: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password, fullName, role }),
        credentials: 'include'
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        toast({
          title: "Registration successful",
          description: "Your account has been created!",
        });
      } else {
        const errorData = await response.text();
        setError(errorData || 'Registration failed');
        toast({
          title: "Registration failed",
          description: errorData || "Registration failed",
          variant: "destructive",
        });
      }
    } catch (err) {
      setError('Failed to connect to the server');
      toast({
        title: "Registration failed",
        description: "Failed to connect to the server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);

    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        setUser(null);
        toast({
          title: "Logged out",
          description: "You have been successfully logged out",
        });
      } else {
        toast({
          title: "Logout failed",
          description: "There was an issue logging out",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Logout failed",
        description: "There was an issue logging out",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue = {
    user,
    isLoading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}
