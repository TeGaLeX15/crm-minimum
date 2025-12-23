import { useEffect, useState } from "react";
import { LogIn, Eye, EyeOff } from "lucide-react";

interface AuthScreenProps {
  onLogin: (email: string, password: string) => boolean;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [email, setEmail] = useState(
    () => localStorage.getItem("saved_email") || ""
  );
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [showPassword, setShowPassword] = useState(false);

  const isFormValid = email && password && !errors.email && !errors.password;

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, email: "Email обязателен" }));
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Введите корректный email" }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (!value) {
      setErrors((prev) => ({ ...prev, password: "Пароль обязателен" }));
    } else if (value.length < 6) {
      setErrors((prev) => ({
        ...prev,
        password: "Пароль должен быть минимум 6 символов",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    const success = onLogin(email, password);
    if (success) {
      localStorage.setItem("saved_email", email);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-neutral-200 p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
          </div>

          <h1 className="text-center mb-8">Вход в OrbixCRM</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-neutral-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e.target.value)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-accent"
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-neutral-600">
                Пароль
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-neutral-200 focus:border-neutral-400 focus:ring-2 focus:ring-accent"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`
                w-full py-2 rounded-lg text-white transition duration-200 
                bg-(--theme-primary) 
                hover:brightness-130 hover:cursor-pointer
                active:brightness-100 active:scale-95
                focus:outline-none
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100
              `}
              style={{ backgroundColor: "var(--theme-primary, #171717)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--theme-primary-dark, #0a0a0a)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "var(--theme-primary, #171717)";
              }}
            >
              Войти
            </button>
          </form>

          <p className="mt-6 text-center text-neutral-500">
            Demo: любой email и пароль
          </p>
        </div>
      </div>
    </div>
  );
}
