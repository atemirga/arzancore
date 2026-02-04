import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, ExternalLink, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../../lib/constants';

const colorClasses: Record<string, { bg: string; bgLight: string; text: string; border: string; gradient: string; shadow: string }> = {
  blue: {
    bg: 'bg-blue-500',
    bgLight: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200 hover:border-blue-400',
    gradient: 'from-blue-500 to-blue-600',
    shadow: 'shadow-blue-500/20',
  },
  purple: {
    bg: 'bg-purple-500',
    bgLight: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200 hover:border-purple-400',
    gradient: 'from-purple-500 to-purple-600',
    shadow: 'shadow-purple-500/20',
  },
  green: {
    bg: 'bg-green-500',
    bgLight: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200 hover:border-green-400',
    gradient: 'from-green-500 to-green-600',
    shadow: 'shadow-green-500/20',
  },
  red: {
    bg: 'bg-red-500',
    bgLight: 'bg-red-50',
    text: 'text-red-600',
    border: 'border-red-200 hover:border-red-400',
    gradient: 'from-red-500 to-red-600',
    shadow: 'shadow-red-500/20',
  },
  orange: {
    bg: 'bg-orange-500',
    bgLight: 'bg-orange-50',
    text: 'text-orange-600',
    border: 'border-orange-200 hover:border-orange-400',
    gradient: 'from-orange-500 to-orange-600',
    shadow: 'shadow-orange-500/20',
  },
  yellow: {
    bg: 'bg-yellow-500',
    bgLight: 'bg-yellow-50',
    text: 'text-yellow-600',
    border: 'border-yellow-200 hover:border-yellow-400',
    gradient: 'from-yellow-500 to-yellow-600',
    shadow: 'shadow-yellow-500/20',
  },
};

export default function Products() {
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  return (
    <section id="products" className="py-20 lg:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100 rounded-full filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-100 rounded-full filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full filter blur-3xl opacity-50" />
      </div>

      <div className="container relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full px-5 py-2.5 mb-6 shadow-lg shadow-blue-500/30">
            <Sparkles size={18} />
            <span className="text-sm font-semibold">6 модулей — 1 платформа</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Модульная платформа{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              для любого бизнеса
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Выбирайте только те модули, которые нужны вашему бизнесу.
            Добавляйте новые по мере роста. Платите только за то, что используете.
          </p>

          {/* Module pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {PRODUCTS.map((product) => {
              const colors = colorClasses[product.color] || colorClasses.blue;
              return (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(activeProduct === product.id ? null : product.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeProduct === product.id
                      ? `bg-gradient-to-r ${colors.gradient} text-white shadow-lg ${colors.shadow}`
                      : `${colors.bgLight} ${colors.text} hover:shadow-md`
                  }`}
                >
                  <span>{product.icon}</span>
                  <span>{product.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {PRODUCTS.map((product, index) => {
            const colors = colorClasses[product.color] || colorClasses.blue;
            const isActive = activeProduct === product.id;
            const isHighlighted = !activeProduct || isActive;

            return (
              <div
                key={product.id}
                className={`group relative transition-all duration-500 ${
                  isHighlighted ? 'opacity-100 scale-100' : 'opacity-40 scale-95'
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link
                  to={`/products/${product.id}`}
                  className={`block bg-white rounded-3xl p-6 lg:p-8 border-2 ${colors.border} transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 relative overflow-hidden`}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                  {/* Top section */}
                  <div className="relative">
                    {/* Icon with animation */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`relative w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${colors.gradient} rounded-2xl flex items-center justify-center text-3xl lg:text-4xl shadow-lg ${colors.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <span className="drop-shadow-sm">{product.icon}</span>
                        {/* Glow effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
                      </div>

                      {/* Domain badge */}
                      <div className={`flex items-center gap-1.5 ${colors.bgLight} ${colors.text} text-xs font-medium px-3 py-1.5 rounded-full`}>
                        <ExternalLink size={12} />
                        {product.url}
                      </div>
                    </div>

                    {/* Title & Short description */}
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {product.name}
                    </h3>
                    <p className={`text-sm font-medium ${colors.text} mb-3`}>
                      {product.shortDescription}
                    </p>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features with improved design */}
                    <div className="space-y-2.5 mb-6">
                      {product.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 text-sm group/feature"
                        >
                          <div className={`w-5 h-5 rounded-full ${colors.bgLight} flex items-center justify-center flex-shrink-0 group-hover/feature:scale-110 transition-transform`}>
                            <Check size={12} className={colors.text} />
                          </div>
                          <span className="text-gray-700 group-hover/feature:text-gray-900 transition-colors">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Divider */}
                    <div className={`h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-6`} />

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                      <div className={`flex items-center gap-2 ${colors.text} font-semibold`}>
                        <span>Подробнее</span>
                        <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
                      </div>

                      {/* Try button */}
                      <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${colors.gradient} text-white text-sm font-medium opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300`}>
                        Попробовать
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }} />
            </div>

            {/* Gradient orbs */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-500/20 rounded-full filter blur-3xl" />

            <div className="relative">
              {/* Module icons row */}
              <div className="flex justify-center gap-4 mb-8">
                {PRODUCTS.map((product) => (
                  <div
                    key={product.id}
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl hover:scale-110 hover:bg-white/20 transition-all cursor-pointer"
                    title={product.name}
                  >
                    {product.icon}
                  </div>
                ))}
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                Не знаете, какой модуль выбрать?
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                Наши специалисты помогут подобрать оптимальное решение для вашего бизнеса.
                Бесплатная консультация и демонстрация возможностей.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:shadow-white/20 transition-all inline-flex items-center justify-center gap-2 group"
                >
                  Попробовать бесплатно
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+77713877225"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
                >
                  Получить консультацию
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
