import { useParams } from 'react-router-dom';
import { usePortal } from '../../hooks/usePortals';

export default function PortalSettingsPage() {
  const { id } = useParams();
  const { data } = usePortal(id);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Настройки портала</h1>
      <div className="card">
        <p className="text-gray-500">
          Настройки для портала: {data?.portal.name}
        </p>
        <p className="text-sm text-gray-400 mt-4">
          TODO: Форма настроек (название, лого, домен, тема)
        </p>
      </div>
    </div>
  );
}
