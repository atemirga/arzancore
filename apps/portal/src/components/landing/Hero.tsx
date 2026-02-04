import { Link } from 'react-router-dom';
import { Play, ArrowRight, Check } from 'lucide-react';
import { STATS, CONTACTS, COMPANY } from '../../lib/constants';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full filter blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/30 rounded-full filter blur-3xl" />

      <div className="container relative">
        <div className="py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div className="text-white">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm">Более 500 компаний уже с нами</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                {COMPANY.name} —{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  {COMPANY.tagline.toLowerCase()}
                </span>
              </h1>

              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {COMPANY.description}
              </p>

              {/* Features list */}
              <div className="flex flex-wrap gap-4 mb-8">
                {['14 дней бесплатно', 'Без кредитной карты', 'Отмена в любой момент'].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-blue-200">
                    <Check size={18} className="text-green-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
                >
                  Начать бесплатно
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={CONTACTS.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <Play size={20} />
                  Запросить демо
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content - Dashboard preview */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main dashboard mockup */}
                <div className="bg-white rounded-2xl shadow-2xl p-4 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gray-100 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>

                    {/* Mini dashboard */}
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-sm text-gray-500 mb-1">Сделки</div>
                          <div className="text-2xl font-bold text-gray-900">₸ 12.5M</div>
                          <div className="text-sm text-green-500">+23% ↑</div>
                        </div>
                        <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                          <div className="text-sm text-gray-500 mb-1">Клиенты</div>
                          <div className="text-2xl font-bold text-gray-900">1,234</div>
                          <div className="text-sm text-green-500">+12% ↑</div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="text-sm text-gray-500 mb-3">Воронка продаж</div>
                        <div className="space-y-2">
                          {[
                            { label: 'Новые', value: 45, color: 'bg-blue-500' },
                            { label: 'В работе', value: 32, color: 'bg-yellow-500' },
                            { label: 'Завершены', value: 28, color: 'bg-green-500' },
                          ].map((item) => (
                            <div key={item.label} className="flex items-center gap-3">
                              <div className="w-20 text-sm text-gray-600">{item.label}</div>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                              </div>
                              <div className="w-8 text-sm text-gray-600">{item.value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating cards */}
                <div className="absolute -left-8 top-1/4 bg-white rounded-xl shadow-xl p-4 transform -rotate-6 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-lg">✓</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Новая сделка</div>
                      <div className="text-xs text-gray-500">₸ 450,000</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-1/4 bg-white rounded-xl shadow-xl p-4 transform rotate-6 animate-float-delayed">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-lg">💬</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">WhatsApp</div>
                      <div className="text-xs text-gray-500">5 новых сообщений</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
