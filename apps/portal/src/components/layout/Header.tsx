import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      {/* Main header */}
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
              A
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">ArzanCloud</span>
              <span className="hidden sm:block text-xs text-gray-500">Бизнес-платформа</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Продукты
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Тарифы
            </Link>
            <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Возможности
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
              Отзывы
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Дашборд
                </Link>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">{user?.name || user?.email}</span>
                  <button
                    onClick={() => logout()}
                    className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Выйти
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                  Войти
                </Link>
                <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all">
                  Попробовать бесплатно
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link to="/products" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Продукты
              </Link>
              <Link to="/pricing" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Тарифы
              </Link>
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                Возможности
              </a>
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Дашборд
                  </Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-left text-gray-600">
                    Выйти
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Войти
                  </Link>
                  <Link to="/register" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium text-center" onClick={() => setMobileMenuOpen(false)}>
                    Попробовать бесплатно
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
