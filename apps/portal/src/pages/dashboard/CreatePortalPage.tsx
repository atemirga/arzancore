import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useCreatePortal } from '../../hooks/usePortals';
import { PRODUCTS } from '../../lib/constants';

export default function CreatePortalPage() {
  const navigate = useNavigate();
  const createPortal = useCreatePortal();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    subdomain: '',
    baseProduct: '',
  });
  const [error, setError] = useState('');

  const handleSubdomainChange = (value: string) => {
    const cleaned = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData({ ...formData, subdomain: cleaned });
  };

  const handleSubmit = async () => {
    setError('');

    try {
      const { portal } = await createPortal.mutateAsync({
        name: formData.name,
        subdomain: formData.subdomain,
      });

      navigate(`/dashboard/portals/${portal.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка создания');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft size={20} />
        Назад к порталам
      </Link>

      <h1 className="text-2xl font-bold mb-8">Создание портала</h1>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-6">Основная информация</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Название компании
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Моя компания"
                className="input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Адрес портала
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={formData.subdomain}
                  onChange={(e) => handleSubdomainChange(e.target.value)}
                  placeholder="mycompany"
                  className="input rounded-r-none flex-1"
                />
                <span className="px-4 py-2 bg-gray-100 border border-l-0 border-gray-300 rounded-r-lg text-gray-500">
                  .arzan.cloud
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Только латинские буквы, цифры и дефис
              </p>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.name || !formData.subdomain}
              className="btn btn-primary w-full py-3"
            >
              Далее
              <ArrowRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Select Product */}
      {step === 2 && (
        <div className="card">
          <h2 className="text-lg font-semibold mb-2">Выберите основной продукт</h2>
          <p className="text-gray-500 mb-6">Вы сможете добавить другие продукты позже</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {PRODUCTS.map((product) => (
              <button
                key={product.id}
                onClick={() => setFormData({ ...formData, baseProduct: product.id })}
                className={`p-4 border-2 rounded-xl text-left transition-colors ${
                  formData.baseProduct === product.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{product.icon}</div>
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-500">{product.shortDescription}</div>
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="btn btn-secondary flex-1"
            >
              Назад
            </button>
            <button
              onClick={handleSubmit}
              disabled={!formData.baseProduct || createPortal.isPending}
              className="btn btn-primary flex-1"
            >
              {createPortal.isPending ? 'Создание...' : 'Создать портал'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
