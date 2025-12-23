import { useNavigate } from "react-router-dom";
import { AuthScreen } from "./AuthScreen";
import { useAuth } from "../../auth/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (email: string, password: string) => {
    login(email, password);
    navigate("/");
    return false;
  };

  return <AuthScreen onLogin={handleLogin} />;
}
