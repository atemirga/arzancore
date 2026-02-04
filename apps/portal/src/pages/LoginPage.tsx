import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            A
          </div>
          <span className="font-bold text-2xl">Arzan</span>
        </Link>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Войти в аккаунт
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-xl sm:px-10">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
