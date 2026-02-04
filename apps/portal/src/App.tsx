import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import PricingPage from './pages/PricingPage';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import InvitePage from './pages/InvitePage';

// Dashboard Pages
import DashboardPage from './pages/dashboard/DashboardPage';
import CreatePortalPage from './pages/dashboard/CreatePortalPage';
import PortalPage from './pages/dashboard/PortalPage';
import PortalSettingsPage from './pages/dashboard/PortalSettingsPage';
import PortalMembersPage from './pages/dashboard/PortalMembersPage';
import MarketplacePage from './pages/dashboard/MarketplacePage';
import BillingPage from './pages/dashboard/BillingPage';
import ProfilePage from './pages/dashboard/ProfilePage';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

// Protected Route
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Guest Route (только для неавторизованных)
function GuestRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      {/* Публичные страницы */}
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:slug" element={<ProductPage />} />
      <Route path="/invite/:token" element={<InvitePage />} />

      {/* Только для гостей */}
      <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
      <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
      <Route path="/forgot-password" element={<GuestRoute><ForgotPasswordPage /></GuestRoute>} />

      {/* Защищённые (Dashboard) */}
      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route index element={<DashboardPage />} />
        <Route path="portals/create" element={<CreatePortalPage />} />
        <Route path="portals/:id" element={<PortalPage />} />
        <Route path="portals/:id/settings" element={<PortalSettingsPage />} />
        <Route path="portals/:id/members" element={<PortalMembersPage />} />
        <Route path="portals/:id/marketplace" element={<MarketplacePage />} />
        <Route path="billing" element={<BillingPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
