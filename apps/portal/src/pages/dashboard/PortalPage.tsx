import { useParams, Link } from 'react-router-dom';
import { Settings, Users, ShoppingBag, ExternalLink } from 'lucide-react';
import { usePortal } from '../../hooks/usePortals';

export default function PortalPage() {
  const { id } = useParams();
  const { data, isLoading } = usePortal(id);

  if (isLoading) {
    return <div className="flex items-center justify-center py-12">Загрузка...</div>;
  }

  if (!data) {
    return <div className="text-center py-12">Портал не найден</div>;
  }

  const { portal } = data;

  return (
    <div>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          {portal.logo ? (
            <img src={portal.logo} alt="" className="w-16 h-16 rounded-xl" />
          ) : (
            <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600 font-bold text-2xl">
              {portal.name[0]}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{portal.name}</h1>
            <p className="text-gray-500">{portal.subdomain}.arzan.cloud</p>
          </div>
        </div>
        <a
          href={`https://${portal.subdomain}.arzan.cloud`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Открыть портал
          <ExternalLink size={18} className="ml-2" />
        </a>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link
          to={`/dashboard/portals/${id}/members`}
          className="card hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
            <Users className="text-blue-600" size={24} />
          </div>
          <div>
            <div className="font-medium">Участники</div>
            <div className="text-sm text-gray-500">Управление командой</div>
          </div>
        </Link>

        <Link
          to={`/dashboard/portals/${id}/marketplace`}
          className="card hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
            <ShoppingBag className="text-purple-600" size={24} />
          </div>
          <div>
            <div className="font-medium">Маркетплейс</div>
            <div className="text-sm text-gray-500">Добавить продукты</div>
          </div>
        </Link>

        <Link
          to={`/dashboard/portals/${id}/settings`}
          className="card hover:shadow-md transition-shadow flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
            <Settings className="text-gray-600" size={24} />
          </div>
          <div>
            <div className="font-medium">Настройки</div>
            <div className="text-sm text-gray-500">Конфигурация портала</div>
          </div>
        </Link>
      </div>

      {/* Active Modules */}
      <div className="card">
        <h2 className="text-lg font-semibold mb-4">Подключенные продукты</h2>
        {portal.modules && portal.modules.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {portal.modules.map((module) => (
              <div
                key={module.id}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
              >
                <span className="text-2xl">{module.icon}</span>
                <div className="flex-1">
                  <div className="font-medium">{module.name}</div>
                  <div className="text-sm text-green-600">Активен</div>
                </div>
                <a
                  href={`https://${module.moduleId}.arzan.cloud?portal=${portal.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  Открыть
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">Нет подключенных продуктов</p>
            <Link
              to={`/dashboard/portals/${id}/marketplace`}
              className="btn btn-primary"
            >
              Добавить продукт
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
