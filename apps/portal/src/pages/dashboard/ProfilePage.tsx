import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { api } from '../../lib/api';

export default function ProfilePage() {
  const { user, refreshUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      await api.updateProfile({ name });
      await refreshUser();
      setMessage('Профиль обновлён');
    } catch {
      setMessage('Ошибка сохранения');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Профиль</h1>

      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">Личные данные</h2>

        {message && (
          <div className={`px-4 py-2 rounded mb-4 ${message.includes('Ошибка') ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="input bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Имя</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          </div>

          <button type="submit" disabled={isLoading} className="btn btn-primary">
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </button>
        </form>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Безопасность</h2>
        <button className="btn btn-secondary">
          Сменить пароль
        </button>
      </div>
    </div>
  );
}
