import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { usePortals } from '../../hooks/usePortals';
import PortalCard from '../../components/dashboard/PortalCard';

export default function DashboardPage() {
  const { data: portals, isLoading } = usePortals();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Мои порталы</h1>
          <p className="text-gray-500">Управляйте своими бизнес-порталами</p>
        </div>
        <Link to="/dashboard/portals/create" className="btn btn-primary">
          <Plus size={20} className="mr-2" />
          Создать портал
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : portals?.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
          <div className="text-4xl mb-4">🏢</div>
          <h3 className="text-lg font-medium mb-2">Нет порталов</h3>
          <p className="text-gray-500 mb-6">Создайте свой первый бизнес-портал</p>
          <Link to="/dashboard/portals/create" className="btn btn-primary">
            Создать портал
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals?.map((portal) => (
            <PortalCard key={portal.id} portal={portal} />
          ))}
        </div>
      )}
    </div>
  );
}
