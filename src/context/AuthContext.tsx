 import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "student" | "instructor"; // normalized to student | admin
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: any, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  const login = (userData: any, authToken: string) => {
    // ✅ normalize backend role
   const normalizedUser: User = {
      ...userData,
      role: userData.role, 
    };


    setUser(normalizedUser);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login"; // ✅ redirect to login
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};
