import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';
import type { Portal } from '../../lib/api';

interface PortalCardProps {
  portal: Portal;
}

export default function PortalCard({ portal }: PortalCardProps) {
  const statusColors = {
    active: 'bg-green-100 text-green-700',
    trial: 'bg-yellow-100 text-yellow-700',
    suspended: 'bg-red-100 text-red-700',
  };

  const statusLabels = {
    active: 'Активен',
    trial: 'Пробный период',
    suspended: 'Приостановлен',
  };

  return (
    <div className="card hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {portal.logo ? (
            <img src={portal.logo} alt="" className="w-12 h-12 rounded-lg object-cover" />
          ) : (
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600 font-bold text-xl">
              {portal.name[0]}
            </div>
          )}
          <div>
            <h3 className="font-semibold text-lg">{portal.name}</h3>
            <p className="text-sm text-gray-500">{portal.subdomain}.arzan.cloud</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[portal.status]}`}>
          {statusLabels[portal.status]}
        </span>
      </div>

      {/* Modules */}
      {portal.modules && portal.modules.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {portal.modules.map((module) => (
            <span
              key={module.id}
              className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 rounded text-sm"
            >
              {module.icon} {module.name}
            </span>
          ))}
        </div>
      )}

      {/* Trial Info */}
      {portal.status === 'trial' && portal.trialEndsAt && (
        <p className="text-sm text-yellow-600 mb-4">
          Trial заканчивается: {new Date(portal.trialEndsAt).toLocaleDateString('ru')}
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          to={`/dashboard/portals/${portal.id}`}
          className="btn btn-secondary flex-1"
        >
          Управление
        </Link>
        <a
          href={`https://${portal.subdomain}.arzan.cloud`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <ExternalLink size={18} />
        </a>
      </div>
    </div>
  );
}
