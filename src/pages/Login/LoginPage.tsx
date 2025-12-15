import { useNavigate } from 'react-router-dom'
import { AuthScreen } from './AuthScreen'

export default function LoginPage() {
  const navigate = useNavigate()

  const handleLogin = (email: string, password: string) => {
    // По приколу выведу
    console.log(email, password)

    // MVP: фейковая авторизация
    localStorage.setItem('token', 'dev-token')

    // После логина идём в дэшборд
    navigate('/')
  }

  return <AuthScreen onLogin={handleLogin} />
}
