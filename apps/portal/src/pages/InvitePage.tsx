import { useParams } from 'react-router-dom';

export default function InvitePage() {
  const { token } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Приглашение в портал</h1>
        <p className="text-gray-600 mb-6">
          Токен приглашения: {token}
        </p>
        <p className="text-sm text-gray-500">
          TODO: Реализовать принятие приглашения
        </p>
      </div>
    </div>
  );
}
