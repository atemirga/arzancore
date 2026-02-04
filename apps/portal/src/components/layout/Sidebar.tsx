import { Link, useLocation, useParams } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  ShoppingBag,
  CreditCard,
  User
} from 'lucide-react';
import clsx from 'clsx';

const mainNav = [
  { path: '/dashboard', label: 'Порталы', icon: LayoutDashboard },
  { path: '/dashboard/billing', label: 'Биллинг', icon: CreditCard },
  { path: '/dashboard/profile', label: 'Профиль', icon: User },
];

export default function Sidebar() {
  const location = useLocation();
  const { id: portalId } = useParams();

  const portalNav = portalId ? [
    { path: `/dashboard/portals/${portalId}`, label: 'Обзор', icon: Building2 },
    { path: `/dashboard/portals/${portalId}/members`, label: 'Участники', icon: Users },
    { path: `/dashboard/portals/${portalId}/marketplace`, label: 'Маркетплейс', icon: ShoppingBag },
    { path: `/dashboard/portals/${portalId}/settings`, label: 'Настройки', icon: Settings },
  ] : [];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
          A
        </div>
        <span className="font-bold text-xl">Arzan</span>
      </Link>

      {/* Main Navigation */}
      <nav className="space-y-1 mb-8">
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-600'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Portal Navigation (if portal selected) */}
      {portalId && portalNav.length > 0 && (
        <>
          <div className="text-xs font-semibold text-gray-400 uppercase mb-2 px-3">
            Портал
          </div>
          <nav className="space-y-1">
            {portalNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  )}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </aside>
  );
}
