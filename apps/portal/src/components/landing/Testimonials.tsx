import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS, STATS } from '../../lib/constants';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-gray-50">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 rounded-full px-4 py-2 mb-4">
            <span className="text-lg">💬</span>
            <span className="text-sm font-medium">Отзывы клиентов</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Нам доверяют{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              сотни компаний
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Узнайте, что говорят наши клиенты о работе с ArzanCloud.
            Реальные истории успеха реального бизнеса.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">
                {stat.value}
              </div>
              <div className="text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/30">
                <Quote className="text-white" size={24} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                "{item.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                  {item.avatar}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-gray-500">{item.role}</div>
                  <div className="text-sm text-blue-600">{item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Присоединяйтесь к нашим клиентам</h3>
              <p className="text-gray-600">Начните использовать ArzanCloud уже сегодня</p>
            </div>
            <a
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all whitespace-nowrap"
            >
              Попробовать бесплатно
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
