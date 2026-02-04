import { useParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import { usePortal } from '../../hooks/usePortals';
import { PRODUCTS } from '../../lib/constants';
import { api } from '../../lib/api';

export default function MarketplacePage() {
  const { id: portalId } = useParams();
  const { data, refetch } = usePortal(portalId);

  const activeModuleIds = data?.portal.modules?.map(m => m.moduleId) || [];

  const handleActivate = async (moduleId: string) => {
    if (!portalId) return;
    await api.activateModule(portalId, moduleId);
    refetch();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Маркетплейс</h1>
      <p className="text-gray-500 mb-8">Добавьте новые продукты к порталу</p>

      {/* Active Products */}
      {activeModuleIds.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Подключенные</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {PRODUCTS.filter(p => activeModuleIds.includes(p.id)).map(product => (
              <div key={product.id} className="card bg-green-50 border-green-200">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{product.icon}</span>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-green-600 flex items-center gap-1">
                      <Check size={16} /> Активен
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Available Products */}
      <h2 className="text-lg font-semibold mb-4">Доступные продукты</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRODUCTS.filter(p => !activeModuleIds.includes(p.id)).map(product => (
          <div key={product.id} className="card">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{product.icon}</span>
              <div>
                <div className="font-semibold">{product.name}</div>
                <div className="text-sm text-gray-500">{product.shortDescription}</div>
              </div>
            </div>

            <ul className="space-y-2 mb-4 text-sm">
              {product.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600">
                  <span className="w-1 h-1 bg-gray-400 rounded-full" />
                  {f}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleActivate(product.id)}
              className="btn btn-primary w-full"
            >
              Подключить (14 дней бесплатно)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
