import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "@/utils/api"


// Define a type for the user object
interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  sex: string;
  IdCard: string;
  region: string;
  address: string;
  bloodType: string;
  role: string;
}

// Define the shape of the context
interface AuthContextType {
  user: User | null;
  loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Define props for the provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const res = await fetch(`${API_URL}/patient/me`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Auth error:", err);
        localStorage.removeItem("token");
        navigate("/patient/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => useContext(AuthContext);
