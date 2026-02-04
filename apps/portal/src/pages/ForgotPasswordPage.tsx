import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: API call
    setSent(true);
  };

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
          Восстановление пароля
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm rounded-xl sm:px-10">
          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-green-600" size={32} />
              </div>
              <h3 className="text-lg font-medium mb-2">Проверьте почту</h3>
              <p className="text-gray-600 mb-6">
                Мы отправили инструкции по восстановлению пароля на {email}
              </p>
              <Link to="/login" className="text-primary-600 hover:underline">
                Вернуться к входу
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-full py-3">
                Отправить инструкции
              </button>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft size={18} />
                Вернуться к входу
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
