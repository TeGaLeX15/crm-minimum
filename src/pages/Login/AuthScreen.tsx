import { useState } from 'react';
import { LogIn } from 'lucide-react';

interface AuthScreenProps {
  onLogin: (email: string, password: string) => void;
}

export function AuthScreen({ onLogin }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
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
          
          <h1 className="text-center mb-8">Вход в CRM</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-neutral-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-neutral-600">
                Пароль
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:border-neutral-400"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full text-white py-2 rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--theme-primary, #171717)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--theme-primary-dark, #0a0a0a)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--theme-primary, #171717)';
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